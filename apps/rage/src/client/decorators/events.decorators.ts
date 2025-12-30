
export function RegisterEvent(eventName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        mp.events.add(eventName, (...args: any[]) => {
            originalMethod.apply(target, args);
        });
    };
}