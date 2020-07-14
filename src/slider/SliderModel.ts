interface ISliderModel {
    minValue: number | string;
    maxValue: number | string;
    stepSizeValue: number | string;
    position: string;
    range: boolean;
    tooltip: boolean;
}

class SliderModel {
    private min: number | string;
    private max: number | string;
    private stepSize: number | string;
    private pos: string;
    private range: boolean;
    private tooltip: boolean;

    constructor(config: ISliderModel) {
        this.min = config.minValue;
        this.max = config.maxValue;
        this.stepSize = config.stepSizeValue;
        this.pos = config.position;
        this.range = config.range;
        this.tooltip = config.tooltip;
    }


    get minValue(): number | string {
        return this.min;
    }

    set minValue(min: number | string) {
        this.min = min;
    }

    get maxValue(): number | string {
        return this.max;
    }

    set maxValue(max: number | string) {
        this.max = max;
    }

    get stepSizeValue(): number | string {
        return this.stepSize;
    }

    set stepSizeValue(stepSize: number | string) {
        this.stepSize = stepSize;
    }

    get position(): string {
        return this.pos;
    }

    set position(pos: string) {
        this.pos = pos;
    }
    get rangeOn(): boolean {
        return this.range;
    }

    set rangeOn(range: boolean) {
        this.range = range;
    }
    get tooltipOn(): boolean {
        return this.tooltip;
    }

    set tooltipOn(tooltip: boolean) {
        this.tooltip = tooltip;
    }
}

export {SliderModel, ISliderModel};