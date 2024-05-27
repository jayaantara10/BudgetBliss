import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  ViewStyle,
} from 'react-native';
import React, {createContext, useContext, useState} from 'react';
import Page from '../components/container/Page';
import Loading from '../components/loading/Loading';

// Make alias for overlay context props
interface OverlayContextProps {
  showOverlay: (children: React.ReactNode) => void;
  showLoading: () => void;
  hideOverlay: () => void;
}

// Make alias for overlay provider props
interface OverlayProviderProps {
  children: React.ReactNode;
}

// Make context
const OverlayContext = createContext<OverlayContextProps | undefined>(
  undefined,
);

const OverlayProvider = ({children}: OverlayProviderProps) => {
  const [_isShowOverlay, _setIsShowOverlay] = useState<boolean>(false);
  const [_renderChlid, _setRenderChild] = useState<React.ReactNode>(null);
  const [_disableTouchSurface, _setDisableTouchSurface] =
    useState<boolean>(false);

  // Init overlay container style
  const _overlayContainerStyle: ViewStyle = {
    flex: 1,
  };

  // Init overlay style
  const _overlayStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
  };

  // Init overlay background style
  const _backgroundStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  };

  // Show Overlay
  const showOverlay = (children: React.ReactNode) => {
    _setRenderChild(children);
    _setIsShowOverlay(true);
  };

  const showLoading = () => {
    _setDisableTouchSurface(true);
    _setRenderChild(<Loading />);
    _setIsShowOverlay(true);
  };

  // Hide overlay
  const hideOverlay = () => {
    _setRenderChild(null);
    _setIsShowOverlay(false);
    _setDisableTouchSurface(false);
  };

  return (
    <OverlayContext.Provider value={{showOverlay, hideOverlay, showLoading}}>
      <Page>
        <View style={_overlayContainerStyle}>
          {children}
          <Modal
            transparent
            visible={_isShowOverlay}
            animationType="slide"
            onRequestClose={hideOverlay}>
            <TouchableWithoutFeedback
              onPress={_disableTouchSurface ? undefined : hideOverlay}>
              <View style={_overlayStyle}>{_renderChlid}</View>
            </TouchableWithoutFeedback>
          </Modal>
          {_isShowOverlay && <View style={_backgroundStyle} />}
        </View>
      </Page>
    </OverlayContext.Provider>
  );
};

// Make use overlay instance for access provider state in any screens
export const useOverlay = (): OverlayContextProps => {
  const context = useContext(OverlayContext);
  if (!context) {
    const errorMessage =
      "Overlay Error: 'useOverlay' must be used within a OverlayProvider";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return context;
};

export default OverlayProvider;
