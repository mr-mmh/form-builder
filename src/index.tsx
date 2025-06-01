import { getFieldRegistry } from "./field/field-registry";
import { createRenderForm } from "./form/create-render-form";

const RenderForm = createRenderForm(getFieldRegistry);
export { RenderForm, createRenderForm };
export type * from "./field/types";
export type * from "./form/types";

export * as FieldComps from "./field/field-comps";
export { createFieldComp } from "./field/create-field-comp";
