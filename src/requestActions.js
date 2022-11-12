export const requestActions = (module, prefix) => ({
    REQUESTED: `${module}.${prefix}.REQUESTED`,
    SUCCEEDED: `${module}.${prefix}.SUCCEEDED`,
    FAILED: `${module}.${prefix}.FAILED`,
})