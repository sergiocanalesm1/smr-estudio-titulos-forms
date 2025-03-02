import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DocumentUploaderProps {
  files: File[];
  setFile: (files: File[]) => void;
  transformedFileName: string;
  error: boolean;
  buttonLabel: string;
  multiple?: boolean;
  helperText?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  files,
  setFile,
  transformedFileName,
  error,
  buttonLabel,
  helperText,
  multiple = false,
}) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    const newFiles = filesArray.map((file, index) => {
      const newName =
        multiple && filesArray?.length > 1
          ? `${transformedFileName}_${index + 1}.pdf`
          : `${transformedFileName}.pdf`;
      return new File([file], newName, { type: file.type });
    });
    setFile(newFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files) return;
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const uploadIcon =
    files?.length > 0 ? (
      <CheckCircleIcon sx={{ mr: 1 }} />
    ) : (
      <CloudUploadIcon sx={{ mr: 1 }} />
    );

  return (
    <Box
      sx={{ my: 2 }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {helperText && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {helperText}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'nowrap',
          width: '100%',
          border: `2px dashed ${theme.palette.primary.main}`,
          padding: 2,
        }}
      >
        {isDragging
        ? <>
            <CloudUploadIcon sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">Suelta los archivos aquí</Typography>
          </>
        : <>
            <Button
              variant={files?.length ? "text" : "outlined"}
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
            {files?.length > 0 && (
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
          </>
        }
      </Box>
    </Box>
  );
};

export default DocumentUploader;
