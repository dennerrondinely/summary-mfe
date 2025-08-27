import SummaryItem from "../components/SummaryItem"
import { categories } from "../constants/categories"
import { colors } from "../constants/colors"
import { globalStyles } from "../styles/globalStyles"
import { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
// @ts-ignore
import { useMoneyStore } from "store/Store"

export default function Summary() {
  const { transactions } = useMoneyStore()

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

  const totals = useMemo(getTotals, [transactions])

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