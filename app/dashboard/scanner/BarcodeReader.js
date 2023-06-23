'use client';
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import Barcode from 'react-barcode';
import {
  DocumentMinusIcon,
  DocumentPlusIcon,
  ArrowPathRoundedSquareIcon,
  CameraIcon,
} from '@heroicons/react/20/solid';
import { findFirst } from '@/utils/services/product/productService';
import { useSession } from 'next-auth/react';
import useThemeContext from '@/context/theme/useContext';
import { useRouter } from 'next/navigation';
import { sendNotification } from '@/utils/_helpers';
import { usePathname } from 'next/navigation';
const BarcodeReader = () => {
  const [barcode, setBarcode] = useState('123');
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const session = useSession();
  // get current URL

  const { globalTransaction, setGlobalTransaction } = useThemeContext();

  useEffect(() => {
    const getVideoDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setDevices(videoDevices);
      setSelectedDeviceId(videoDevices[0]?.deviceId);
    };

    getVideoDevices();
  }, []);

  async function handleScannToSocket(barcode) {
    const product = await findFirst({
      where: {
        barcode: {
          equals: barcode,
        },
      },
    });

    if (!product) {
      sendNotification({
        title: 'Product not found',
        message: 'Please try again',
        type: 'error',
      });
      return;
    }

    sendNotification({
      title: 'Product Found',
      message: barcode,
      type: 'add_product',
    });
  }

  useEffect(() => {
    handleScannToSocket(barcode);
  }, [barcode]);

  useEffect(() => {
    const target = document.querySelector('#barcode-scanner-container');

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: target,
          constraints: {
            facingMode: 'environment',
            deviceId: {
              exact: selectedDeviceId,
            },
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setBarcode(data.codeResult.code);
    });

    const updateDrawingCanvas = (result) => {
      const canvas = Quagga.canvas.dom.overlay;
      const context = Quagga.canvas.ctx.overlay;

      // canvas absolutely positioned on top of barcode-scanner-container
      canvas.style.left = `${target.offsetLeft}px`;
      canvas.style.top = `${target.offsetTop}px`;
      canvas.style.width = `${target.offsetWidth}px`;

      canvas.style.position = 'absolute';

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (result && result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, context, {
          color: '#00F',
          lineWidth: 2,
        });
      }
    };

    Quagga.onProcessed(updateDrawingCanvas);

    return () => {
      Quagga.stop();
      Quagga.offProcessed(updateDrawingCanvas);
    };
  }, [selectedDeviceId]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const handleFocusButtonClick = () => {
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      const capabilities = track.getCapabilities();
      if (capabilities.focusMode.includes('single-shot')) {
        track.applyConstraints({ advanced: [{ focusMode: 'single-shot' }] });
      }
    }
  };

  const handleZoomInButtonClick = () => {
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      const capabilities = track.getCapabilities();
      if (capabilities.zoom && capabilities.zoom.max > 0) {
        const currentZoom = track.getConstraints().advanced[0]?.zoom ?? 0;
        const newZoom = Math.min(currentZoom + 1, capabilities.zoom.max);
        track.applyConstraints({ advanced: [{ zoom: newZoom }] });
      }
    }
  };

  const handleZoomOutButtonClick = () => {
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.getCapabilities === 'function') {
      const capabilities = track.getCapabilities();
      if (capabilities.zoom && capabilities.zoom.max > 0) {
        const currentZoom = track.getConstraints().advanced[0]?.zoom ?? 0;
        const newZoom = Math.max(currentZoom - 1, capabilities.zoom.min);
        track.applyConstraints({ advanced: [{ zoom: newZoom }] });
      }
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <select
        className="p-2 rounded-md bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark px-4 py-4 my-4 w-64"
        value={selectedDeviceId}
        onChange={handleDeviceChange}
      >
        {devices.map((device) => (
          <option
            key={device.deviceId}
            value={device.deviceId || ''}
            className="bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-primary-light dark:hover:text-primary-dark"
          >
            {device.label}
          </option>
        ))}
      </select>
      <div className="relative mt-4">
        <div
          id="barcode-scanner-container"
          className="w-64 h-64 rounded-lg overflow-hidden "
        ></div>
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={handleFocusButtonClick}
          >
            <CameraIcon className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={handleZoomInButtonClick}
          >
            <DocumentPlusIcon className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={handleZoomOutButtonClick}
          >
            <DocumentMinusIcon className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="my-8">
        <Barcode value={barcode} />
      </div>
      {/* <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="p-2 rounded-md bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark px-4 py-4 my-4 w-64"
      /> */}
    </div>
  );
};

export default BarcodeReader;
