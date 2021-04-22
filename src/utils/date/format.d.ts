type fmt = "YYYY/MM/DD hh:mm:ss" | "YYYY/M/D h:m:s" | "MM/DD hh:mm" | "hh:mm:ss";

export declare function formatDate(time: number | boolean, fmt: string | fmt): string;
// export declare function defineComponent<Props, RawBindings = object>(
//   setup: (props: Readonly<Props>, ctx: SetupContext) => RawBindings | RenderFunction,
// ): DefineComponent<Props, RawBindings>;

interface IMomentsDateOptions {
  day: boolean
}
export declare function momentsDate(publishTime: number, options: IMomentsDateOptions): string;

interface ICheckStatusReturn {
  status: number;
  remainTime: number;
}
export declare function checkStatus(startTime: number, endTime: number, cur: number): ICheckStatusReturn;
