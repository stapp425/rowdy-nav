import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface CarouselItemOptions {
    key: string;
    img: string;
    headline: string;
    body: string;
};

const StartScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    { key: '1', img: 'logo-transparent.png', headline: 'Welcome', body: 'Welcome to RowdyNav' },
    { key: '2', img: 'college-freshman.jpg', headline: 'Intuitive Indoor Navigation for the Flabbergasted Freshman', body: 'Explore our amazing features' },
    { key: '3', img: 'utsa-san-pedro-1.jpg', headline: 'Try It In Realtime at UTSA San Pedro 1', body: 'Our first indoor-mapped building is UTSA’s Downtown Campus’s San Pedro 1 building. Test our wayfinding and directions services.' },
];

    const renderItem = ( item:CarouselItemOptions ) => {
        return (
        <View style={styles.slide}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} edges={['top']}>
                    <ScrollView style={styles.scrollView}>
                        <Image
                        resizeMode={'contain'}
                        style={{ width: '100%', height: '20rem' }}
                        source={{uri: '../assets/images/' + item.img}}
                        />
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.headline}</Text>
                        <Text>{item.body}</Text>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>           
        </View>
        );
    };

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={ 72 }
        itemWidth={ 24 }
        onSnapToItem={(index:number) => setActiveIndex(index)}
      />
      <Button title="Get Started: Explore San Pedro 1" disabled={activeIndex !== slides.length - 1}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    // Add styles for your slides here
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
});

export default StartScreen;