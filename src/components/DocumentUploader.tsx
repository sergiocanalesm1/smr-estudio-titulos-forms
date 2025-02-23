import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DocumentUploaderProps {
  files: File[];
  setFile: (files: File[]) => void;
  transformedFileName: string;
  multiple: boolean;
  error: boolean;
  buttonLabel: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  files,
  setFile,
  transformedFileName,
  multiple,
  error,
  buttonLabel,
}) => {
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    const newFiles = fileList.map((file, index) => {
      // Only append _{index+1} if multiple is true and more than one file is selected
      const newName =
        multiple && fileList.length > 1
          ? `${transformedFileName}_${index + 1}.pdf`
          : `${transformedFileName}.pdf`;
      return new File([file], newName, { type: file.type });
    });
    setFile(newFiles);
  };

  const uploadIcon =
    files.length > 0 ? (
      <CheckCircleIcon sx={{ mr: 1 }} />
    ) : (
      <CloudUploadIcon sx={{ mr: 1 }} />
    );

  return (
    <Box sx={{ my: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'nowrap',
          width: '100%',
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{
            textTransform: 'none',
            borderWidth: 2,
            borderColor: error ? theme.palette.error.main : theme.palette.primary.dark,
            color: error ? theme.palette.error.main : theme.palette.primary.dark,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            '&:hover': {
              borderWidth: 2,
              borderColor: error ? theme.palette.error.main : theme.palette.primary.dark,
            },
          }}
        >
          {uploadIcon}
          <span style={{ whiteSpace: 'nowrap' }}>{buttonLabel}</span>
          <input
            type="file"
            hidden
            onChange={handleChange}
            multiple={multiple}
            accept="application/pdf"
          />
        </Button>
        {files.length > 0 && (
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {files.map((file) => file.name).join(', ')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DocumentUploader;
