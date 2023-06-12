import React from 'react';
import { render } from '@testing-library/react';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';
import '@testing-library/jest-dom/extend-expect';
describe('NarrowPageContainer', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <NarrowPageContainer>
        <div>Child element</div>
      </NarrowPageContainer>
    );
    expect(getByText('Child element')).toBeInTheDocument();
  });
});