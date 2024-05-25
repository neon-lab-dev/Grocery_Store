import {Image, Modal} from 'native-base';
import * as React from 'react';

interface LoaderProps {
  isOpen: boolean;
}

const Loader: React.FC<LoaderProps> = ({isOpen}) => {
  return (
    <Modal isOpen={isOpen} height={'full'}>
      <Modal.Content
        alignItems={'center'}
        justifyContent={'center'}
        bg={'#404040'}
        borderRadius={20}
        borderWidth={1}
        borderColor={'white'}>
        <Image
          alt="Loader"
          source={require('../../assets/images/icons/loading.gif')}
          height={150}
          width={150}
        />
      </Modal.Content>
    </Modal>
  );
};

export default Loader;
