import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import UiDataTable from "~/components/Ui/DataTable.vue";
import { faker } from "@faker-js/faker";

interface UserRow {
  id: string;
  name: string;
  email: string;
  age: number;
  [prop: string]: any;
}

const createUserRow = (): UserRow => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 40 }),
});

const columns = [
  { prop: "id", label: "ID" },
  { prop: "name", label: "Name" },
  { prop: "email", label: "Email" },
  { prop: "age", label: "Age" },
];

const data = new Array(5).fill(null).map(createUserRow);

test("renders header columns", () => {
  const wrapper = mount(UiDataTable, {
    props: { columns, data: [] },
  });

  const cols = wrapper.findAll("table thead tr th");

  expect(cols).toHaveLength(4);
  columns.forEach((column, i) => {
    expect(cols.at(i)?.text()).toBe(column.label);
  });
});

test("renders each data prop items as rows", () => {
  const wrapper = mount(UiDataTable, {
    props: { columns, data },
  });

  const rows = wrapper.findAll("table tbody tr");
  expect(rows).toHaveLength(5);

  data.forEach((item, i) => {
    const rowValues = rows.at(i)?.findAll("td");
    expect(rowValues).toHaveLength(4);

    rowValues?.forEach((value, j) => {
      const { prop } = columns[j];
      expect(value.text()).toContain(item[prop]);
    });
  });
});

test("renders a checkbox in each row as the first column when 'selectable' prop is true", () => {
  const wrapper = mount(UiDataTable, {
    props: { data, columns, selectable: true },
  });

  const rows = wrapper.findAll("table tbody tr");

  rows.forEach((row) => {
    expect(row.find("td:first-child input[type=checkbox]").exists()).toBe(true);
  });
});

describe("Row Selection: single mode", () => {
  test("when a row is selected should add the item to selected prop", async () => {
    const wrapper = mount(UiDataTable, {
      props: {
        data,
        columns,
        selectable: true,
      },
    });

    const row = wrapper.findAll("table tbody tr").at(1);
    await row?.find("td:first-child input[type=checkbox]").setValue(true);

    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("update:selected");
    expect(emitted["update:selected"]).toHaveLength(1);
    expect(emitted["update:selected"][0]).toEqual([[data[1]]]);
  });

  test("when a row is deselected should remove the item from selected prop", async () => {
    const wrapper = mount(UiDataTable, {
      props: {
        data,
        columns,
        selectable: true,
        selected: [data[1]],
      },
    });

    const selectedRow = wrapper.find("table tbody tr:nth-child(2)");
    await selectedRow.find("input[type=checkbox]").setValue(false);

    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("update:selected");
    expect(emitted["update:selected"]).toHaveLength(1);
    expect(emitted["update:selected"][0]).toEqual([[]]);
  });
});

describe("Row Selection: multiple mode", () => {
  test("updates 'selected' prop as an array of 3 elements in 'multiple' selection mode (selecting)", async () => {
    const wrapper = mount(UiDataTable, {
      props: {
        data,
        columns,
        selectable: true,
        selectionMode: "multiple",
      },
    });

    let row = wrapper.findAll("table tbody tr").at(0);
    await row?.find("td:first-child input[type=checkbox]").setValue(true);

    row = wrapper.findAll("table tbody tr").at(1);
    await row?.find("td:first-child input[type=checkbox]").setValue(true);

    row = wrapper.findAll("table tbody tr").at(2);
    await row?.find("td:first-child input[type=checkbox]").setValue(true);

    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("update:selected");
    expect(emitted["update:selected"]).toHaveLength(3);

    let eventParams = emitted["update:selected"][0] as [UserRow[]];
    expect(eventParams[0]).toEqual([data[0]]);

    eventParams = emitted["update:selected"][1] as [UserRow[]];
    expect(eventParams[0]).toEqual([data[0], data[1]]);

    eventParams = emitted["update:selected"][2] as [UserRow[]];
    expect(eventParams[0]).toEqual([data[0], data[1], data[2]]);
  });

  test("updates 'selected' prop as an array of 2 elements in 'multiple' selection mode (deselecting)", async () => {
    const wrapper = mount(UiDataTable, {
      props: {
        data,
        columns,
        selectable: true,
        selectionMode: "multiple",
        selected: [data[0], data[1], data[2]],
      },
    });

    const row = wrapper.findAll("table tbody tr").at(1);
    await row?.find("td:first-child input[type=checkbox]").setValue(false);

    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("update:selected");
    expect(emitted["update:selected"]).toHaveLength(1);

    const eventParams = emitted["update:selected"][0] as [UserRow[]];
    expect(eventParams[0]).toEqual([data[0], data[2]]);
  });
});
