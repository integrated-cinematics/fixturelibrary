import {
  outputJSON, pathExists, readJSON,
} from 'fs-extra';
import path from 'node:path';
import { ItemExistanceError } from './fixtureindex';

export const storageDirectory = path.resolve(__dirname, '../.fixturelibrary');

export async function readJsonFile(filename: string): Promise<any> {
  // Preparing path
  let filePath = `${storageDirectory}/${filename}`;
  if (!filename.endsWith('.json')) filePath += '.json';
  // Checking if file exists
  if (!await pathExists(filePath)) {
    throw new ItemExistanceError(`${filePath} doesn't exist!`);
  }
  try {
    return await readJSON(filePath);
  } catch (err) {
    console.error(err);
  }
  return undefined;
}

export async function writeJsonFile(name: string, data: {} | [], override = false):
Promise<boolean> {
  // Preparing filePath
  let filePath = `${storageDirectory}/${name}`;
  if (!filePath.endsWith('.json')) filePath += '.json';
  // Checking if file already exists
  if (!override && await pathExists(filePath)) {
    throw new ItemExistanceError(`This file at ${path} already exist!`);
  }
  try {
    outputJSON(filePath, data);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
