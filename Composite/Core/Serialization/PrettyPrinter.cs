using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data;
using Composite.Core.Types;
using Composite.Core.Linq;
using Composite.Data.DynamicTypes;
using System.Reflection;
using System.Collections;
using System.ComponentModel;

namespace Composite.Core.Serialization
{
    /// <summary>    
    /// Used for printing a value to a string in a nice way.
    /// The result string will contain line feeds etc.
    /// It handles IData, Lists, Dictionaries, KeyValyePairs, Tupples etc.
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class PrettyPrinter
    {
        /// <summary>        
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        public static string Print(object result)
        {
            StringBuilder sb = new StringBuilder();
            Print(result, sb, 0);
            return sb.ToString();
        }



        private static void Print(object result, StringBuilder sb, int indentLevel, bool includeLineFeed = true)
        {
            if (result == null)
            {
                sb.AppendLine("(null)");
            }
            else if ((result is IEnumerable) && (result.GetType() != typeof(string)))
            {
                IEnumerable enumerable = result as IEnumerable;
                List<object> values = enumerable.ToListOfObjects();

                sb.AppendLine();

                int counter = 0;
                foreach (object value in values)
                {
                    PrintIndent(sb, indentLevel);
                    sb.Append("result[" + counter + "] : ");
                    Print(value, sb, indentLevel + 1);

                    counter++;
                }
            }
            else if (result is IData)
            {
                IData dataItem = result as IData;

                DataTypeDescriptor dataTypeDescriptor = Composite.Data.DynamicTypes.DynamicTypeManager.GetDataTypeDescriptor(dataItem.GetImmutableTypeId());

                sb.AppendLine(dataItem.GetType().ToString());
                PrintIndent(sb, indentLevel);
                sb.AppendLine("{");
                foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields)
                {
                    PropertyInfo propertyInfo = dataItem.GetType().GetPropertiesRecursively().Where(f => f.Name == dataFieldDescriptor.Name).First();

                    object value = propertyInfo.GetValue(dataItem, null);

                    PrintIndent(sb, indentLevel + 1);

                    sb.Append(dataFieldDescriptor.Name + " : ");

                    if (value != null) sb.Append(value.ToString());
                    else sb.Append("(null)");

                    sb.AppendLine(", ");
                }
                PrintIndent(sb, indentLevel);
                sb.AppendLine("{");
            }
            else if ((result.GetType().IsGenericType) && (result.GetType().GetGenericTypeDefinition() == typeof(KeyValuePair<,>)))
            {
                PropertyInfo keyPropertyInfo = result.GetType().GetProperty("Key");
                PropertyInfo valuePropertyInfo = result.GetType().GetProperty("Value");

                object keyValue = keyPropertyInfo.GetValue(result, null);
                object valueValue = valuePropertyInfo.GetValue(result, null);
                sb.Append("(");
                Print(keyValue, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(valueValue, sb, indentLevel + 1, false);
                sb.AppendLine(")");
            }
            else if ((result.GetType().IsGenericType) && (result.GetType().GetGenericTypeDefinition() == typeof(Tuple<,>)))
            {
                PropertyInfo item1PropertyInfo = result.GetType().GetProperty("Item1");
                PropertyInfo item2PropertyInfo = result.GetType().GetProperty("Item2");

                object item1Value = item1PropertyInfo.GetValue(result, null);
                object item2Value = item2PropertyInfo.GetValue(result, null);
                sb.Append("(");
                Print(item1Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item2Value, sb, indentLevel + 1, false);
                sb.AppendLine(")");
            }
            else if ((result.GetType().IsGenericType) && (result.GetType().GetGenericTypeDefinition() == typeof(Tuple<,,>)))
            {
                PropertyInfo item1PropertyInfo = result.GetType().GetProperty("Item1");
                PropertyInfo item2PropertyInfo = result.GetType().GetProperty("Item2");
                PropertyInfo item3PropertyInfo = result.GetType().GetProperty("Item3");

                object item1Value = item1PropertyInfo.GetValue(result, null);
                object item2Value = item2PropertyInfo.GetValue(result, null);
                object item3Value = item3PropertyInfo.GetValue(result, null);

                sb.Append("(");
                Print(item1Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item2Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item3Value, sb, indentLevel + 1, false);
                sb.AppendLine(")");
            }
            else if ((result.GetType().IsGenericType) && (result.GetType().GetGenericTypeDefinition() == typeof(Tuple<,,,>)))
            {
                PropertyInfo item1PropertyInfo = result.GetType().GetProperty("Item1");
                PropertyInfo item2PropertyInfo = result.GetType().GetProperty("Item2");
                PropertyInfo item3PropertyInfo = result.GetType().GetProperty("Item3");
                PropertyInfo item4PropertyInfo = result.GetType().GetProperty("Item4");

                object item1Value = item1PropertyInfo.GetValue(result, null);
                object item2Value = item2PropertyInfo.GetValue(result, null);
                object item3Value = item3PropertyInfo.GetValue(result, null);
                object item4Value = item4PropertyInfo.GetValue(result, null);

                sb.Append("(");
                Print(item1Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item2Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item3Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item4Value, sb, indentLevel + 1, false);
                sb.AppendLine(")");
            }
            else if ((result.GetType().IsGenericType) && (result.GetType().GetGenericTypeDefinition() == typeof(Tuple<,,,,>)))
            {
                PropertyInfo item1PropertyInfo = result.GetType().GetProperty("Item1");
                PropertyInfo item2PropertyInfo = result.GetType().GetProperty("Item2");
                PropertyInfo item3PropertyInfo = result.GetType().GetProperty("Item3");
                PropertyInfo item4PropertyInfo = result.GetType().GetProperty("Item4");
                PropertyInfo item5PropertyInfo = result.GetType().GetProperty("Item5");

                object item1Value = item1PropertyInfo.GetValue(result, null);
                object item2Value = item2PropertyInfo.GetValue(result, null);
                object item3Value = item3PropertyInfo.GetValue(result, null);
                object item4Value = item4PropertyInfo.GetValue(result, null);
                object item5Value = item5PropertyInfo.GetValue(result, null);

                sb.Append("(");
                Print(item1Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item2Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item3Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item4Value, sb, indentLevel + 1, false);
                sb.Append(", ");
                Print(item5Value, sb, indentLevel + 1, false);
                sb.AppendLine(")");
            }
            else
            {
                if (includeLineFeed)
                {
                    sb.AppendLine(result.ToString());
                }
                else
                {
                    sb.Append(result.ToString());
                }
            }
        }



        private static void PrintIndent(StringBuilder sb, int indentLevel)
        {
            for (int i = 0; i < indentLevel; i++)
            {
                sb.Append("  ");
            }
        }
    }
}

