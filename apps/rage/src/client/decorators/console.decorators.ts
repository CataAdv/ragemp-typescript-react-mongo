import { consoleCommands } from "@/core/console/console.constants";

export const RegisterConsoleCommand = (name: string) => {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        consoleCommands.set(name.toLowerCase(), descriptor.value.bind(target));
    };
};
