class SliderModel {
    private name: string = 'SliderModel';

    constructor(moduleName: string) {
        this.moduleName = moduleName;
    }

    get moduleName(): string {
        return this.name;
    }

    set moduleName(name: string) {
        this.name = name;
    }
}

export { SliderModel };