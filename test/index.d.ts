type TObject = Record<TPluginProps, string>;
type TSpyObject = Record<TModelProps, jasmine.Spy>;
type TRunFunc = (title: string, data: TObject) => void;
