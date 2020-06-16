import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  YellowBox,
} from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

YellowBox.ignoreWarnings(['Picker has been extracted']);

const App = () => {
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    capital && interest && months ? calculate() : reset();
  }, [capital, interest, months]);

  const reset = () => {
    setTotal(null);
    setErrorMessage(null);
  };

  const calculate = () => {
    // eslint-comments/no-unlimited-disable
    let numValid = /^[-]?[0-9]+$/;
    reset();
    if (!capital) {
      setErrorMessage('Ingresa Capital solicitado');
      return;
    }
    let resultValidation = numValid.test(capital);
    if (resultValidation !== true) {
      setErrorMessage('Capital invalido');
      return;
    }
    if (!interest) {
      setErrorMessage('Ingresa porcentaje de Interes');
      return;
    }
    resultValidation = numValid.test(interest);
    if (resultValidation !== true) {
      setErrorMessage('Interes invalido');
      return;
    }
    if (!months) {
      setErrorMessage('Selecciona cantidad de Meses');
      return;
    }
    const i = interest / 100;
    const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
    setTotal({
      monthlyFee: fee.toFixed(2).replace('.', ','),
      //toFixed(2) Para maximo 2 digitos despues de punto (.)
      //replace('.', ',') Para sustituir el punto por una coma
      final: (fee.toFixed(2) * months).toFixed(2).replace('.', ','),
    });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.PRIMARY_COLOR}
      />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.safeArea}>
            <View style={styles.background} />
            <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
            <Form
              ph1="Cantidad a pedir"
              setCapital={setCapital}
              ph2="Interes %"
              setInterest={setInterest}
              ph3="Selecciona los Plazos"
              setMonths={setMonths}
            />
          </View>

          <View>
            <ResultCalculation
              capital={capital}
              interest={interest}
              months={months}
              total={total}
              errorMessage={errorMessage}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Footer calculate={calculate} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
});

export default App;
