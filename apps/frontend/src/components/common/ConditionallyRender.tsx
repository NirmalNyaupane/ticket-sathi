interface ConditionallyRenderProps {
  condition: boolean;
  show: TargetElement;
  elseShow?: TargetElement;
}

type TargetElement =
  | React.ReactNode
  | JSX.Element
  | JSX.Element[]
  | RenderFunc
  | null;

type RenderFunc = () => JSX.Element | null;

const ConditionallyRender = ({
  condition,
  show,
  elseShow,
}: ConditionallyRenderProps): JSX.Element | null => {
  const handleFunction = (renderFunc: RenderFunc): JSX.Element | null => {
    const result = renderFunc();
    if (!result) {
      console.warn(
        "Nothing was return from your render function, verify that you are returing a valid react component"
      );

      return null;
    }
    return result;
  };

  const isFunc = (param: TargetElement): boolean => {
    return typeof param === "function";
  };

  if (condition) {
    if (isFunc(show)) {
      return handleFunction(show as RenderFunc);
    }

    return show as JSX.Element;
  }

  if (!condition && elseShow) {
    if (isFunc(elseShow)) {
      return handleFunction(elseShow as RenderFunc);
    }

    return elseShow as JSX.Element;
  }

  return null;
};

export default ConditionallyRender;
