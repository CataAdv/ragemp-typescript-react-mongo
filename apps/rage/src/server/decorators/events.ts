

export function RegisterEvent(event_name: string) {
    return function (
        target: any,
        property_key: string,
        descriptor: PropertyDescriptor
    ) {
        mp.events.add(event_name, (...args: any[]) => {
            descriptor.value.apply(target, args);
        });
    };
}
