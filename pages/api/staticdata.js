import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  const obj = JSON.parse(fileContents);
  //Sort and return the content of the data file in json format
  res.status(200).json(
    obj.sort((a,b) => {return a.event_date.localeCompare( b.event_date )})
  );
}