import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";

const taskLimitNumber = 10;

const generateTask = (idColumn, text, title) => ({
  id: uuid(),
  text,
  idColumn,
  title,
});

const generateColumn = (id, name, taskIds) => ({
  id,
  name,
  limit: taskLimitNumber,
  color: randomColor({ luminosity: "light" }),
  taskIds,
});

const columnsRawData = [
  generateColumn(1, "Resources", [
    generateTask(1, "This is a task description of Financials & Growth Data", "Financials & Growth Data"),
    generateTask(1, "2017 Goals and APIs", "Complete the Presentation of 2017 Goals and APIs"),
    generateTask(1, "Brand Guide", "Complete the Presentation of Brand Guide"),
    generateTask(1, "Employee Manual", "Complete the Employee Manual"),
  ]),
  generateColumn(2, "To Do", [
    generateTask(2, "Burrito", "Build a better Burrito"),
    generateTask(2, "Nacho", "Nacho Ordinary Birthday"),
  ]),
  generateColumn(3, "Doing", [
    generateTask(3, "The taco truck world tour", "The taco truck world tour"),
    generateTask(3, "Instagram Campaign", "NO Filter Instagram Campaign"),
  ]),
  generateColumn(4, "Done", [
    generateTask(4, "Corn vs Flour", "Focus Group"),
  ]),
];

export default columnsRawData;