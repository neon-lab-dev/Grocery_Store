import {ScrollView, Skeleton, Text, View} from 'native-base';
import * as React from 'react';
import {horizontalScale, verticalScale} from '../../assets/scaling';

export const SkeletonProductDetails = () => {
  return (
    <ScrollView flex={1}>
      <View h={verticalScale(355)} py={verticalScale(50)}>
        <Skeleton
          w={200}
          h={200}
          rounded={50}
          alignSelf={'center'}
          mb={verticalScale(30)}
        />
        <View flexDir={'row'} style={{gap: 7}} alignSelf={'center'}>
          {Array.from({length: 4}, (_, index) => (
            <Skeleton
              key={index}
              rounded={12}
              h={horizontalScale(56)}
              w={horizontalScale(56)}
            />
          ))}
        </View>
      </View>
      <Skeleton w={'100%'} h={0.5} />
      <Skeleton
        w={horizontalScale(277)}
        h={verticalScale(20)}
        rounded={12}
        my={verticalScale(20)}
        mx={horizontalScale(20)}
      />
      <Skeleton w={'100%'} h={0.5} />
      <Skeleton
        w={horizontalScale(78)}
        h={verticalScale(15)}
        rounded={12}
        my={verticalScale(20)}
        mx={horizontalScale(20)}
      />
      <View flexDir={'row'} style={{gap: 12}} px={horizontalScale(20)}>
        {Array.from({length: 2}, (_, index) => (
          <Skeleton
            key={index}
            w={horizontalScale(90)}
            h={verticalScale(55)}
            rounded={12}
          />
        ))}
      </View>
    </ScrollView>
  );
};
