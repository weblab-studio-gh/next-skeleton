"use client";
import TextInput from "@/components/ui/inputs/TextInput";
import React, { useState, useRef, useEffect } from "react";

export default function ProfileField({ fields, user, save, data }) {
  const excludeFields = (field) => {
    return (
      field !== "id" &&
      field !== "createdAt" &&
      field !== "company" &&
      field !== "integrations" &&
      field !== "user" &&
      field !== "profileId" &&
      field !== "profile" &&
      field !== "userId"
    );
  };
  const [profile, setProfile] = useState(
    Object.assign(
      {},
      ...fields.map((o, key) => {
        if (excludeFields(o.name)) {
          return {
            [o.name]: data?.[o.name] === undefined ? "" : data?.[o.name],
          };
        }
      })
    )
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [userData, setUserData] = useState(data);
  const inputRef = useRef(null);

  //   set isEditing to false when user clicks outside of the input without ref
  useEffect(() => {
    // if click is not on a html button labelled "save", close the input
    const handleClickOutside = (e) => {
      if (e.target.innerText !== "Save" && e.target.type !== "button") {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DO NOT USE INPUTREF
  const separateCamelCase = (string) => {
    return string
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
      .trim();
  };

  const handleSave = async () => {
    const res = await save(profile);
    // createProfile(profile);
    setUserData(res);
    setIsEditing(!isEditing);
  };

  const saveOnEnter = async (e) => {
    if (e.key === "Enter") {
      const res = await save(profile);
      setUserData(res);
      setIsEditing(!isEditing);
    }
  };

  return (
    <>
      {fields?.map((field, key) => {
        if (excludeFields(field.name)) {
          return (
            <div key={key} className="flex flex-col space-y-2">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                  {separateCamelCase(field.name)}
                </dt>
                <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                  {isEditing && editItem.name === field.name ? (
                    <TextInput
                      focus={isEditing}
                      inputRef={inputRef}
                      value={profile[field.name]}
                      onKeyDown={saveOnEnter}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          [field.name]: e.target.value,
                        });
                      }}
                      name={field}
                      width="flex-grow h-7"
                    />
                  ) : (
                    <span className="flex-grow">{userData?.[field.name]}</span>
                  )}
                  <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                    {!field.isId && (
                      <>
                        {isEditing && editItem.name === field.name ? (
                          <button
                            onClick={() => {
                              setIsEditing(!isEditing);
                              setEditItem(field);
                              handleSave();
                            }}
                            type="button"
                            className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setIsEditing(!isEditing);
                              setEditItem(field);
                            }}
                            type="button"
                            className="rounded-md p-1 bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-color-light dark:hover:text-color2-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-3"
                          >
                            Update
                          </button>
                        )}
                      </>
                    )}
                    <span
                      className="text-secondary-light dark:text-secondary-dark"
                      aria-hidden="true"
                    ></span>
                    {!field.isId &&
                      !field.required &&
                      profile[field] !== undefined && (
                        <button
                          type="button"
                          className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Remove
                        </button>
                      )}
                  </span>
                </dd>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
