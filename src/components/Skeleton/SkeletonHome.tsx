import {ScrollView, Skeleton, View} from 'native-base';
import * as React from 'react';
import {horizontalScale, verticalScale} from '../../assets/scaling';

export const SkeletonHome = () => {
  return (
    <ScrollView flex={1} _contentContainerStyle={{py: verticalScale(20)}}>
      <View
        w={'100%'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={horizontalScale(20)}
        py={verticalScale(10)}>
        <View flexDir={'row'} alignItems={'center'}>
          <Skeleton rounded={'full'} height={35} width={35} mr={1} />
          <Skeleton width={20} height={7} rounded={10} />
        </View>
        <Skeleton rounded={10} height={35} width={35} />
      </View>
      <View my={verticalScale(20)} px={horizontalScale(20)}>
        <Skeleton rounded={12} height={verticalScale(50)} />
      </View>
      <View flexDir={'row'} pl={horizontalScale(20)}>
        <Skeleton rounded={20} width={'90%'} height={verticalScale(170)} />
        <Skeleton
          borderTopLeftRadius={20}
          borderBottomLeftRadius={20}
          height={verticalScale(170)}
          w={horizontalScale(70)}
          position={'absolute'}
          right={-50}
        />
      </View>
      <View
        flexDir={'row'}
        my={verticalScale(20)}
        px={horizontalScale(20)}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <View style={{gap: verticalScale(6)}}>
          <Skeleton
            h={verticalScale(24)}
            w={horizontalScale(200)}
            rounded={12}
          />
          <Skeleton
            h={verticalScale(19)}
            w={horizontalScale(160)}
            rounded={12}
          />
        </View>
        <Skeleton rounded={12} h={verticalScale(19)} w={horizontalScale(47)} />
      </View>
      <View
        flexDir={'row'}
        px={horizontalScale(20)}
        style={{gap: horizontalScale(20)}}>
        {Array.from({length: 2}, (_, index) => (
          <View key={index} style={{gap: 8}}>
            <Skeleton
              w={horizontalScale(140)}
              h={verticalScale(165)}
              rounded={16}
            />
            <Skeleton
              w={horizontalScale(140)}
              h={verticalScale(30)}
              rounded={16}
            />
            <Skeleton
              w={horizontalScale(50)}
              h={verticalScale(15)}
              rounded={16}
            />
            <View
              w={horizontalScale(140)}
              flexDir={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <View h={verticalScale(33)} justifyContent={'space-between'}>
                <Skeleton
                  w={horizontalScale(25)}
                  h={verticalScale(15)}
                  rounded={16}
                />
                <Skeleton
                  w={horizontalScale(25)}
                  h={verticalScale(15)}
                  rounded={16}
                />
              </View>
              <Skeleton
                rounded={10}
                w={horizontalScale(70)}
                h={verticalScale(33)}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
