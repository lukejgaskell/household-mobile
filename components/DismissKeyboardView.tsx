import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import React from 'react';

type IProps = {
  children: any;
  [key: string]: any;
};

const DismissKeyboardView = (Comp: any) => {
  return ({ children, ...props }: IProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboardView(View);
