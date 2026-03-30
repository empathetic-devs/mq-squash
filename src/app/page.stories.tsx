import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within, expect } from "storybook/test";

import Home from "./page";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectOption2: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "option2");
    await expect(canvas.getByText("Selected option: option2")).toBeInTheDocument();
  },
};

export const SelectOption3: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "option3");
    await expect(canvas.getByText("Selected option: option3")).toBeInTheDocument();
  },
};

export const TypeInInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type something...");
    await userEvent.type(input, "Hello Storybook!");
    await expect(canvas.getByText("Input value: Hello Storybook!")).toBeInTheDocument();
  },
};

export const ClearInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type something...");
    await userEvent.type(input, "temporary text");
    await userEvent.clear(input);
    await expect(canvas.getByText("Input value:")).toBeInTheDocument();
  },
};

export const BothInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "option3");
    const input = canvas.getByPlaceholderText("Type something...");
    await userEvent.type(input, "Combined test");
    await expect(canvas.getByText("Selected option: option3")).toBeInTheDocument();
    await expect(canvas.getByText("Input value: Combined test")).toBeInTheDocument();
  },
};
