import SummaryItem from "../components/SummaryItem"
import { TransactionItemProps } from "../components/TransactionItem"
import { categories } from "../constants/categories"
import { colors } from "../constants/colors"
import { globalStyles } from "../styles/globalStyles"
import { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"

export const transactions: TransactionItemProps[] = [
  {
    category: 'income',
    date: '2025-08-21',
    description: 'Salário mensal',
    value: 4500.0,
  },
  {
    category: 'food',
    date: '2025-08-20',
    description: 'Almoço no restaurante',
    value: 45.9,
  },
  {
    category: 'house',
    date: '2025-08-19',
    description: 'Conta de luz',
    value: 230.0,
  },
  {
    category: 'education',
    date: '2025-08-18',
    description: 'Curso online',
    value: 150.0,
  },
  {
    category: 'travel',
    date: '2025-08-17',
    description: 'Passagem de ônibus',
    value: 85.0,
  },
  {
    category: 'income',
    date: '2025-08-16',
    description: 'Freelance de design',
    value: 800.0,
  },
  {
    category: 'food',
    date: '2025-08-15',
    description: 'Compra no mercado',
    value: 320.0,
  },
  {
    category: 'house',
    date: '2025-08-14',
    description: 'Aluguel do mês',
    value: 1200.0,
  },
  {
    category: 'education',
    date: '2025-08-13',
    description: 'Livro didático',
    value: 90.0,
  },
  {
    category: 'travel',
    date: '2025-08-12',
    description: 'Reserva de hotel',
    value: 480.0,
  },
  {
    category: 'income',
    date: '2025-08-11',
    description: 'Venda de produto',
    value: 250.0,
  },
  {
    category: 'food',
    date: '2025-08-10',
    description: 'Jantar delivery',
    value: 72.5,
  },
  {
    category: 'house',
    date: '2025-08-09',
    description: 'Manutenção elétrica',
    value: 150.0,
  },
  {
    category: 'education',
    date: '2025-08-08',
    description: 'Mensalidade faculdade',
    value: 890.0,
  },
  {
    category: 'travel',
    date: '2025-08-07',
    description: 'Combustível para viagem',
    value: 220.0,
  },
  {
    category: 'income',
    date: '2025-08-06',
    description: 'Comissão de vendas',
    value: 1200.0,
  },
  {
    category: 'food',
    date: '2025-08-05',
    description: 'Café da manhã',
    value: 18.0,
  },
  {
    category: 'house',
    date: '2025-08-04',
    description: 'Conta de água',
    value: 80.0,
  },
  {
    category: 'education',
    date: '2025-08-03',
    description: 'Material escolar',
    value: 60.0,
  },
  {
    category: 'travel',
    date: '2025-08-02',
    description: 'Aluguel de carro',
    value: 300.0,
  },
];

export default function Summary() {

  const getTotals = () => {
    const totals =  {
      sum: 0,
      [categories.income.name]: 0,
      [categories.food.name]: 0,
      [categories.education.name]: 0,
      [categories.house.name]: 0,
      [categories.travel.name]: 0,
    };

    for (let i = 0; i < transactions.length; i++) {
      const item = transactions[i]

      totals[item.category] += item.value

      if (item.category === categories.income.name) {
        totals.sum += item.value
      } else {
        totals.sum -= item.value
      }
    }
    return totals
  }

  const totals = useMemo(getTotals, [])

  const valueStyle = totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        <SummaryItem
          category={categories.income.name as keyof typeof categories}
          value={totals[categories.income.name]}
        />
        <SummaryItem
          category={categories.food.name as keyof typeof categories}
          value={totals[categories.food.name]}
        />
        <SummaryItem
          category={categories.house.name as keyof typeof categories}
          value={totals[categories.house.name]}
        />
        <SummaryItem
          category={categories.education.name as keyof typeof categories}
          value={totals[categories.education.name]}
        />
        <SummaryItem
          category={categories.travel.name as keyof typeof categories}
          value={totals[categories.travel.name]}
        />
        <View style={globalStyles.line} />
        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: 800
  }
})