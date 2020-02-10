import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import React from 'react';

const DismissKeyboardView = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboardView(View);
