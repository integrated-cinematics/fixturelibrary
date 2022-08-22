import {
  outputJSON, pathExists, readJSON,
} from 'fs-extra';
import path from 'node:path';
import { ItemExistanceError } from './fixtureindex';

class FileHandler {
  // eslint-disable-next-line class-methods-use-this
  public get storageDirectory() {
    return process.env.OFL_INDEX ?? path.resolve(__dirname, '../.fixturelibrary');
  }

  public get indexPath() {
    return `${this.storageDirectory}/index.json`;
  }

  async readJson(filename: string): Promise<any> {
    // Preparing path
    let filePath = `${this.storageDirectory}/${filename}`;
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

  async writeJson(name: string, data: {} | [], override = false): Promise<boolean> {
    // Preparing filePath
    let filePath = `${this.storageDirectory}/${name}`;
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
}

export default new FileHandler();
