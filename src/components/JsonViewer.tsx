import React from 'react';
import { JsonView } from '@textea/json-viewer';

interface JsonViewerProps {
  data: any;
  theme?: 'light' | 'dark' | 'auto';
  collapsed?: boolean | number;
  displayObjectSize?: boolean;
  displayDataTypes?: boolean;
  enableClipboard?: boolean;
  quotesOnKeys?: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  theme = 'auto',
  collapsed = false,
  displayObjectSize = true,
  displayDataTypes = true,
  enableClipboard = true,
  quotesOnKeys = false,
}) => {
  return (
    <div className="w-full h-full overflow-auto">
      <JsonView
        value={data}
        theme={theme}
        collapsed={collapsed}
        displayObjectSize={displayObjectSize}
        displayDataTypes={displayDataTypes}
        enableClipboard={enableClipboard}
        quotesOnKeys={quotesOnKeys}
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '14px',
        }}
      />
    </div>
  );
};

export default JsonViewer;