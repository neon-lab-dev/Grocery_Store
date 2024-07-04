import React from 'react';
import { View, Skeleton, ScrollView } from 'native-base';
import { horizontalScale, verticalScale } from '../../assets/scaling';

export const SkeletonProductCard = () => {
  return (
    <View style={{ padding: horizontalScale(10), alignItems: 'center' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: horizontalScale(10) }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={{
              width: horizontalScale(135),
              height: verticalScale(220),
              marginHorizontal: horizontalScale(10),
              backgroundColor: '#F9FAFB',
              borderRadius: 20,
              padding: verticalScale(10),
              alignItems: 'center'
            }}
          >
            <Skeleton
              w={horizontalScale(120)}
              h={verticalScale(120)}
              borderRadius={20}
            />
            <Skeleton
              mt={verticalScale(10)}
              w={horizontalScale(90)}
              h={verticalScale(20)}
              borderRadius={4}
            />
            <Skeleton
              mt={verticalScale(5)}
              w={horizontalScale(60)}
              h={verticalScale(15)}
              borderRadius={4}
            />
            <Skeleton
              mt={verticalScale(5)}
              w={horizontalScale(70)}
              h={verticalScale(30)}
              borderRadius={10}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
