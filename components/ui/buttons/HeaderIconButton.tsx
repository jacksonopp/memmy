import React from "react";
import { Pressable, useTheme } from "native-base";

// eslint-disable-next-line import/no-extraneous-dependencies

interface CIconButtonProps {
  icon: any;
  onPress: () => void;
  
  /** Label describing the button */
  accessibilityLabel?: string;
  /**
   * An extra label explaining what happens when a user clicks the button
   * ex. A button conveys a state, but clicking the button changes the state
   */
  accessibilityHint?: string;
}

function HeaderIconButton({ icon, onPress, accessibilityLabel, accessibilityHint }: CIconButtonProps) {
  const theme = useTheme();
  const iconElement = React.Children.only(icon);
  const newIconElement = React.cloneElement(iconElement, {
    color: theme.colors.app.accent,
  });
  return <Pressable
    accessible={!!accessibilityLabel}
    accessibilityLabel={accessibilityLabel} 
    accessibilityHint={accessibilityHint}
    onPress={onPress}
  >{newIconElement}</Pressable>;
}

export default HeaderIconButton;
