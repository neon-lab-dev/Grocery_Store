import {Image, Modal, View} from 'native-base';
import * as React from 'react';
import {height} from '../../assets/scaling';

interface LoaderProps {
  isOpen: boolean;
}

const Loader: React.FC<LoaderProps> = ({isOpen}) => {
  return (
    <Modal isOpen={isOpen} size={'xs'}>
      <Modal.Content
        alignItems={'center'}
        justifyContent={'center'}
        bg={'accent.900'}>
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
