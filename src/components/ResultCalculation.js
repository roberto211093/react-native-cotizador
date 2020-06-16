import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ResultData = props => {
  const {title, value} = props;
  return (
    <View style={styles.value}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const ResultCalculation = props => {
  const {capital, interest, months, total, errorMessage} = props;
  return (
    <View style={styles.container}>
      {total && (
        <View style={styles.boxResult}>
          <Text style={styles.title}>RESUMEN</Text>
          <ResultData title="Capital solicitado" value={`$ ${capital}`} />
          <ResultData title="Interes %" value={`${interest} %`} />
          <ResultData title="Meses" value={months} />
          <ResultData title="Total Mensual" value={`$ ${total.monthlyFee}`} />
          <ResultData title="Total Final" value={`$ ${total.final}`} />
      </View>
      )}
      <View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
};

export default ResultCalculation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
  boxResult: {
    padding: 30,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
