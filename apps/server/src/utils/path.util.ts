import path from 'path';
const PathUtil = {
  TEMP_FOLDER_PATH: path.resolve(process.cwd(), 'temp'),
  UPLOADS_FOLDER_PATH: path.resolve(process.cwd(), 'public', 'uploads'),
};

export { PathUtil };