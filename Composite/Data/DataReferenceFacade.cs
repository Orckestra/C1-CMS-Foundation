using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Data
{
    /// <summary>
    /// Referenced type: The type that is "pointed" to by another type
    /// Referee type: The type that is "pointing" to a nother type
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataReferenceFacade
    {
        private static readonly Dictionary<PropertyInfo, Type> _propertyReferenceTargetTypeLookup = new Dictionary<PropertyInfo, Type>();

        private static readonly object _lock = new object();

        private static readonly MethodInfo HasReferenceMethodInfo = StaticReflection.GetGenericMethodInfo(() => HasReference<IData>(null, null, null));
        private static readonly MethodInfo GetReferencesMethodInfo = StaticReflection.GetGenericMethodInfo(() => GetReferences<IData>(null, null, null, false));


        /// <exclude />
        public static List<Type> GetRefereeTypes(this Type referencedType)
        {
            Verify.ArgumentNotNull(referencedType, "referencedType");

            return DataReferenceRegistry.GetRefereeTypes(referencedType).ToList();
        }



        internal static bool TryValidateDeleteSuccess(this IData dataToDelete)
        {
            var foundDataset = new Dictionary<DataSourceId, Tuple<IData, ForeignPropertyInfo>>();

            GetRefereesRecursively(dataToDelete, true, 
                (type, foreignKey) => !foreignKey.IsOptionalReference 
                    && (!foreignKey.AllowCascadeDeletes || DataReferenceRegistry.GetRefereeTypes(type).Count > 0), foundDataset);

            return foundDataset.All(kvp => kvp.Value.Item2.AllowCascadeDeletes);
        }



        internal static void ValidateForeignKeyIntegrity(this IData refereeData)
        {
            Verify.ArgumentNotNull(refereeData, "refereeData");

            var invalidForeignKeyPropertyNames = new List<string>();

            if (!TryValidateForeignKeyIntegrity(refereeData, invalidForeignKeyPropertyNames))
            {
                var sb = new StringBuilder();

                sb.Append("The following foreign keys integrity did not validate: ");

                bool isFirst = true;
                foreach (string propertyName in invalidForeignKeyPropertyNames)
                {
                    if (!isFirst)
                    {
                        sb.Append(", ");
                    }
                    else
                    {
                        isFirst = false;
                    }

                    sb.Append(propertyName);

                    PropertyInfo invalidProperty = refereeData.GetType().GetAllProperties().FirstOrDefault(f => f.Name == propertyName);
                    if (invalidProperty != null)
                    {
                        object propertyValue = invalidProperty.GetValue(refereeData, null);
                        if (propertyValue != null)
                        {
                            string propertyStringValue = propertyValue.ToString();
                            if (propertyStringValue.Length > 50) propertyStringValue = propertyStringValue.Substring(0, 40) + "...";
                            sb.AppendFormat(" ['{0}']", propertyStringValue);
                        }
                        else
                        {
                            sb.Append(" [null]");
                        }
                    }
                }
                sb.Append("; DataType: ").Append(refereeData.DataSourceId.InterfaceType.FullName);

                throw new InvalidOperationException(sb.ToString());
            }
        }



        /// <exclude />
        public static bool TryValidateForeignKeyIntegrity(this IData refereeData)
        {
            Verify.ArgumentNotNull(refereeData, "refereeData");

            return TryValidateForeignKeyIntegrity(refereeData, null);
        }



        /// <exclude />
        public static bool TryValidateForeignKeyIntegrity(this IData refereeData, List<string> invalidForeignKeyPropertyNames)
        {
            Verify.ArgumentNotNull(refereeData, "refereeData");

            bool totalValidity = true;

            foreach (ForeignPropertyInfo foreignPropertyInfo in DataReferenceRegistry.GetForeignKeyProperties(refereeData.DataSourceId.InterfaceType))
            {
                // If Nullable references are allowed, a check for SourcePropertyInfo.PropertyType.GetGenericDef == typeof(Nullable<?>) 
                // If it is a nullable and has no value, then all is ok and continue 
                // If it is a nullable and has a value, assign the value to refereeForeignKeyValue
                // Else change nothing /MRJ
                object refereeForeignKeyValue = foreignPropertyInfo.SourcePropertyInfo.GetValue(refereeData, null);

                // Handling Nullable<>
                if (refereeForeignKeyValue == null && (foreignPropertyInfo.SourcePropertyInfo.PropertyType.IsGenericType))
                {
                    Type type = foreignPropertyInfo.SourcePropertyInfo.PropertyType.GetGenericTypeDefinition();
                    if (type == typeof(Nullable<>))
                    {
                        continue;
                    }
                }

                // Handling null of type string where the reference should be handled as a non-reference
                if (refereeForeignKeyValue == null && foreignPropertyInfo.IsNullableString)
                {
                    continue;
                }

                if (foreignPropertyInfo.IsNullReferenceValueSet)
                {
                    object nullReferenceKeyValue = foreignPropertyInfo.NullReferenceValue;

                    if (foreignPropertyInfo.NullReferenceValueType != null)
                    {
                        nullReferenceKeyValue = ValueTypeConverter.Convert(nullReferenceKeyValue, foreignPropertyInfo.NullReferenceValueType);
                    }

                    if (object.Equals(nullReferenceKeyValue, refereeForeignKeyValue))
                    {
                        continue; // The foreign key is a null reference 
                    }
                }

                bool valid = false;

                if (refereeForeignKeyValue != null)
                {
                    foreach (DataScopeIdentifier dataScopeIdentifier in DataFacade.GetSupportedDataScopes(foreignPropertyInfo.TargetType))
                    {
                        using (new DataScope(dataScopeIdentifier))
                        {
                            IQueryable scopeData = DataFacade.GetData(foreignPropertyInfo.TargetType);

                            if (HasReference(scopeData, foreignPropertyInfo, refereeForeignKeyValue))
                            {
                                valid = true;

                                break;
                            }
                        }
                    }
                }

                if (!valid)
                {
                    totalValidity = false;

                    if (invalidForeignKeyPropertyNames != null)
                    {
                        invalidForeignKeyPropertyNames.Add(foreignPropertyInfo.SourcePropertyName);
                    }
                }
            }

            return totalValidity;
        }



        private static bool HasReference(IQueryable queryable, ForeignPropertyInfo foreignPropertyInfo, object propertyValue)
        {
            var targetType = foreignPropertyInfo.TargetType;

            var methodInfo = HasReferenceMethodInfo.MakeGenericMethod(new[] { targetType });
            return (bool)methodInfo.Invoke(null, new[] { queryable, foreignPropertyInfo.TargetKeyPropertyInfo, propertyValue });
        }



        private static IEnumerable GetReferences(IQueryable queryable, Type dataType, PropertyInfo propertyInfo, object keyValue, bool justOne)
        {
            var methodInfo = GetReferencesMethodInfo.MakeGenericMethod(new[] { dataType });
            return (IEnumerable)methodInfo.Invoke(null, new[] { queryable, propertyInfo, keyValue, justOne });
        }



        private static IEnumerable GetReferences(IQueryable queryable, ForeignPropertyInfo foreignPropertyInfo, object keyValue, bool justOne)
        {
            Type sourceType = foreignPropertyInfo.SourcePropertyInfo.DeclaringType;
            return GetReferences(queryable, sourceType, foreignPropertyInfo.SourcePropertyInfo, keyValue, justOne);
        }



        /// <summary>
        /// To be run through reflection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryable"></param>
        /// <param name="propertyInfo"></param>
        /// <param name="keyValue"></param>
        /// <param name="justOne"></param>
        /// <returns></returns>
        private static IEnumerable GetReferences<T>(IQueryable<T> queryable, PropertyInfo propertyInfo, object keyValue, bool justOne)
        {
            Verify.ArgumentNotNull(queryable, "queryable");
            Verify.ArgumentNotNull(propertyInfo, "propertyInfo");
            Verify.ArgumentNotNull(keyValue, "keyValue");

            // Building query:  
            //   select record from queryable 
            //   where record.'ForeingIdColumn' = 'keyValue'
            //   [Take(1)]

            ParameterExpression parameter = Expression.Parameter(typeof(T), "record");
            var propertyExpression = Expression.Property(parameter, propertyInfo);

            var constantExpression = GetConstantExpression(keyValue, propertyInfo);
            var equalExpression = Expression.Equal(propertyExpression, constantExpression);

            var lambdaFunc = Expression.Lambda<Func<T, bool>>(equalExpression, new[] { parameter });

            IQueryable<T> resultQuery = queryable.Where(lambdaFunc);

            return justOne ? resultQuery.Take(1) : resultQuery;
        }



        private static ConstantExpression GetConstantExpression(object keyValue, PropertyInfo propertyInfo)
        {
            // Property foreingPropertyInfo could have type System.Nullable<T> when keyValue have type T.

            if(propertyInfo.PropertyType.FullName.StartsWith(typeof(System.Nullable<>).FullName))
            {
                return Expression.Constant(keyValue, propertyInfo.PropertyType);
            }

            return Expression.Constant(keyValue);
        }


        /// <summary>
        /// To be run through reflection
        /// </summary>
        private static bool HasReference<T>(IQueryable queryable, PropertyInfo propertyInfo, object propertyValue)
        {
            Verify.ArgumentNotNull(queryable, "queryable");
            Verify.ArgumentNotNull(propertyInfo, "propertyInfo");
            Verify.ArgumentNotNull(propertyValue, "propertyValue");

            // Building query:  
            //   select record from queryable 
            //   where record.'ForeingIdColumn' = 'propertyValue'
            //   any;

            var typedQueryable = queryable as IQueryable<T>;
            Verify.ArgumentCondition(typedQueryable != null, "queryable", "The argument should implement '{0}' interface.".FormatWith(typeof(IQueryable<T>)));

            ParameterExpression parameter = Expression.Parameter(typeof(T), "record");
            var propertyExpression = Expression.Property(parameter, propertyInfo);
            var constantExpression = GetConstantExpression(propertyValue, propertyInfo);
            var equalExpression = Expression.Equal(propertyExpression, constantExpression);

            var lambdaFunc = Expression.Lambda<Func<T, bool>>(equalExpression, new[] { parameter });

            return typedQueryable.Where(lambdaFunc).Any();
        }


        /// <exclude />
        public static List<IData> GetNotOptionalReferences<T>(T data) where T : IData
        {
            return GetNotOptionalReferences(data, false);
        }

        /// <exclude />
        public static List<IData> GetNotOptionalReferences<T>(T data, bool allScopes) where T : IData
        {
            return GetRefereesInt(data, allScopes, (type, fp) => !fp.IsOptionalReference)
                    .Select(t => t.Item1).ToList();
        }

        /// <exclude />
        internal static List<IData> GetReferences(IData data, bool allScopes, Func<Type, ForeignPropertyInfo, bool> foreignKeyFilter)
        {
            return GetRefereesInt(data, allScopes, foreignKeyFilter)
                    .Select(t => t.Item1).ToList();
        }


        /// <exclude />
        internal static IList<Tuple<IData, ForeignPropertyInfo>> GetRefereesInt(
            IData data, bool allScopes, Func<Type, ForeignPropertyInfo, bool> propertyFilter) 
        {
            Verify.ArgumentNotNull(data, nameof(data));

            var result = new List<Tuple<IData, ForeignPropertyInfo>>();

            Type dataType = data.DataSourceId.InterfaceType;
            var referencedTypes = DataReferenceRegistry.GetRefereeTypes(dataType);

            foreach (var referencedType in referencedTypes)
            {
                foreach (var foreignKeyProperty in GetForeignKeyProperties(referencedType, dataType))
                {
                    if (!propertyFilter(referencedType, foreignKeyProperty))
                    {
                        continue;
                    }

                    IEnumerable<IData> references = data.GetReferees(referencedType, new[] { foreignKeyProperty.SourcePropertyInfo }, allScopes);

                    result.AddRange(references.Select(r => new Tuple<IData, ForeignPropertyInfo>(r, foreignKeyProperty)));
                }
            }

            // IData may contain a self-reference field, so we're removing references to original IData item from the result set
            result.RemoveAll(reference => reference.Item1.DataSourceId.Equals(data.DataSourceId));

            return result;
        }


        /// <exclude />
        public static bool TryGetReferenceType(this PropertyInfo propertyInfo, out Type typeBeingReferenced)
        {
            Verify.ArgumentNotNull(propertyInfo, "propertyInfo");

            typeBeingReferenced = null;

            lock (_lock)
            {
                if (_propertyReferenceTargetTypeLookup.TryGetValue(propertyInfo, out typeBeingReferenced) == false)
                {
                    IEnumerable<ForeignPropertyInfo> foreignKeysOnType = DataReferenceRegistry.GetForeignKeyProperties(propertyInfo.DeclaringType);
                    ForeignPropertyInfo match = foreignKeysOnType.FirstOrDefault(f => f.SourcePropertyName == propertyInfo.Name);

                    typeBeingReferenced = (match != null ? match.TargetType : null);

                    _propertyReferenceTargetTypeLookup.Add(propertyInfo, typeBeingReferenced);
                }
            }

            return (typeBeingReferenced != null);
        }


        /// <exclude />
        public static DataReference<T> BuildDataReference<T>(object keyValue) where T : class, IData
        {
            return new DataReference<T>(keyValue);
        }

        /// <exclude />
        public static IDataReference BuildDataReference(Type referencedType, object keyValue)
        {
            Verify.ArgumentNotNull(keyValue, "keyValue");
            Verify.ArgumentNotNull(referencedType, "referencedType");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(referencedType), "referencedType", "The referenced type must implement IData");

            Type genericReferenceType = typeof(DataReference<>).MakeGenericType(new Type[] { referencedType });

            return (IDataReference)Activator.CreateInstance(genericReferenceType, new object[] { keyValue });
        }



        internal static IEnumerable<ForeignPropertyInfo> GetForeignKeyProperties(Type refereeType)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");

            return DataReferenceRegistry.GetForeignKeyProperties(refereeType);
        }



        internal static IEnumerable<ForeignPropertyInfo> GetForeignKeyProperties(Type refereeType, Type referencedType)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");
            Verify.ArgumentNotNull(referencedType, "referencedType");

            return
                from fk in DataReferenceRegistry.GetForeignKeyProperties(refereeType)
                where fk.TargetType == referencedType
                      || referencedType.IsAssignableFrom(fk.TargetType)
                select fk;
        }



        internal static ForeignPropertyInfo GetForeignKeyPropertyInfo(Type refereeType, string refereePropertyName)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");

            return DataReferenceRegistry.GetForeignKeyProperties(refereeType).Single(fk => fk.SourcePropertyName == refereePropertyName);
        }



        internal static IEnumerable<string> GetForeignKeyPropertyNames(Type refereeType, Type referencedType)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");
            Verify.ArgumentNotNull(referencedType, "referencedType");

            return
                from fk in DataReferenceRegistry.GetForeignKeyProperties(refereeType)
                where fk.TargetType == referencedType
                select fk.SourcePropertyName;
        }



        internal static bool CascadeDeleteAllowed(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return DataReferenceRegistry.GetForeignKeyProperties(data.DataSourceId.InterfaceType)
                                        .All(_ => _.AllowCascadeDeletes);
        }



        internal static bool CascadeDeleteAllowed(this IData data, Type referencedType)
        {
            Verify.ArgumentNotNull(data, "data");
            Verify.ArgumentNotNull(referencedType, "referencedType");

            return GetForeignKeyProperties(data.DataSourceId.InterfaceType, referencedType)
                   .All(_ => _.AllowCascadeDeletes);
        }



        /// <summary>
        /// Returns true if the refereeType has a foreign key to the referencedType
        /// </summary>
        /// <param name="refereeType"></param>
        /// <param name="referencedType"></param>
        /// <returns></returns>
        internal static bool ReferenceExists(Type refereeType, Type referencedType)
        {
            return DataReferenceRegistry.GetRefereeTypes(referencedType).Contains(refereeType);
        }



        internal static bool IsDataReferred(this IData referencedData)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, true, null, null, true).Any();
        }



        internal static bool IsDataReferred(this IData referencedData, Type refereeType, IEnumerable<PropertyInfo> foreignKeyProperties, bool allScopes)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, true, refereeType, foreignKeyProperties, allScopes).Any();
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static List<IData> GetReferees(this IData referencedData)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, false, null, null, true);
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static List<IData> GetReferees(this IData referencedData, Type refereeType)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, false, refereeType, null, true);
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static List<IData> GetReferees(this IData referencedData, bool allScopes)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, false, null, null, allScopes);
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static List<IData> GetReferees(this IData referencedData, Type refereeType, IEnumerable<PropertyInfo> foreignKeyProperties, bool allScopes)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            return GetReferees(referencedData, false, refereeType, foreignKeyProperties, allScopes);
        }



        internal static IEnumerable<Tuple<IData, ForeignPropertyInfo>> GetNotOptionalRefereesRecursively(
            this IData referencedData, bool allScopes = true)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            var foundDataset = new Dictionary<DataSourceId, Tuple<IData, ForeignPropertyInfo>>();

            GetRefereesRecursively(referencedData, allScopes, (t, f) => !f.IsOptionalReference, foundDataset);

            return foundDataset.Values;
        }



        /// <exclude />
        public static IData GetReferenced(this IData refereeData, string foreignKeyPropertyName)
        {
            Verify.ArgumentNotNull(refereeData, "refereeData");
            Verify.ArgumentNotNullOrEmpty(foreignKeyPropertyName, "foreignKeyPropertyName");

            ForeignPropertyInfo foreignPropertyInfo =
                (from fkpi in DataReferenceRegistry.GetForeignKeyProperties(refereeData.DataSourceId.InterfaceType)
                 where fkpi.SourcePropertyName == foreignKeyPropertyName
                 select fkpi).Single();

            object sourceKeyValue = foreignPropertyInfo.SourcePropertyInfo.GetValue(refereeData, null);

            // Handling of Nullable<>
            if (sourceKeyValue == null)
            {
                return null;
            }

            Type targetType = foreignPropertyInfo.TargetType;
            var dataset = DataFacade.GetData(targetType);

            IEnumerable queryResult = GetReferences(dataset, targetType, foreignPropertyInfo.TargetKeyPropertyInfo, sourceKeyValue, true);
            foreach(var result in queryResult)
            {
                Verify.That(result is IData, "Query result should implement '{0}' interface", typeof (IData).FullName);
                return result as IData;
            }
            return null;
        }



        private static void GetRefereesRecursively(IData referencedData, bool allScopes, 
            Func<Type, ForeignPropertyInfo, bool> foreignKeyPredicate,
            Dictionary<DataSourceId, Tuple<IData, ForeignPropertyInfo>> foundDataset)
        {
            Verify.ArgumentNotNull(referencedData, nameof(foundDataset));
            Verify.ArgumentNotNull(foundDataset, nameof(referencedData));

            IList<Tuple<IData, ForeignPropertyInfo>> referees = GetRefereesInt(referencedData, allScopes, foreignKeyPredicate);

            foreach (var data in referees)
            {
                if (!foundDataset.ContainsKey(data.Item1.DataSourceId))
                {
                    foundDataset.Add(data.Item1.DataSourceId, data);

                    GetRefereesRecursively(data.Item1, allScopes, foreignKeyPredicate, foundDataset);
                }
            }
        }



        private static List<IData> GetReferees(IData referencedData, IQueryable dataset, IEnumerable<ForeignPropertyInfo> foreignKeyProperyInfos, bool returnOnFirstFound)
        {
            List<IData> result = new List<IData>();

            foreach (ForeignPropertyInfo foreignKeyPropertyInfo in foreignKeyProperyInfos)
            {
                if (!referencedData.DataSourceId.InterfaceType.IsAssignableFrom(foreignKeyPropertyInfo.TargetType))
                {
                    continue;
                }
                object sourceKeyValue = foreignKeyPropertyInfo.TargetKeyPropertyInfo.GetValue(referencedData, null);

                result.AddRange(GetReferences(dataset, foreignKeyPropertyInfo, sourceKeyValue, returnOnFirstFound).Cast<IData>());
                if (returnOnFirstFound && result.Count > 0)
                {
                    break;
                }
            }
            return result;
        }



        private static List<IData> GetReferees(IData referencedData, bool returnOnFirstFound, Type refereeType, IEnumerable<PropertyInfo> propertiesToSearchBy, bool allScopes)
        {
            Verify.ArgumentNotNull(referencedData, "referencedData");

            IEnumerable<Type> refereeTypes;
            if (refereeType == null)
            {
                refereeTypes = DataReferenceRegistry.GetRefereeTypes(referencedData.DataSourceId.InterfaceType).Distinct();
            }
            else
            {
                if (!DataReferenceRegistry.GetRefereeTypes(referencedData.DataSourceId.InterfaceType).Contains(refereeType))
                {
                    throw new ArgumentException($"The referencedData of type '{referencedData.DataSourceId.InterfaceType}' is not referenced by the given refereeType '{refereeType}'");
                }

                refereeTypes = new List<Type> { refereeType };
            }

            var referees = new List<IData>();

            foreach (Type refType in refereeTypes)
            {
                var foreignKeyProperties = DataReferenceRegistry.GetForeignKeyProperties(refType);

                if (propertiesToSearchBy != null)
                {
                    foreignKeyProperties =
                        (from fkpi in foreignKeyProperties
                         from pi in propertiesToSearchBy
                         where fkpi.SourcePropertyInfo == pi
                         select fkpi).ToList();
                } 

                if (allScopes)
                {
                    foreach (DataScopeIdentifier dataScopeIdentifier in DataFacade.GetSupportedDataScopes(refType))
                    {
                        using (new DataScope(dataScopeIdentifier))
                        {
                            IQueryable dataset = DataFacade.GetData(refType);
                            List<IData> refs = GetReferees(referencedData, dataset, foreignKeyProperties, returnOnFirstFound);
                            referees.AddRange(refs.KeyDistinct()); // KeyDistinct is used here if a type has more than one reference to a nother time

                            if (returnOnFirstFound && referees.Count > 0)
                            {
                                return referees;
                            }
                        }
                    }
                }
                else
                {
                    IQueryable dataset = DataFacade.GetData(refType);
                    List<IData> refs = GetReferees(referencedData, dataset, foreignKeyProperties, returnOnFirstFound);
                    referees.AddRange(refs.KeyDistinct()); // KeyDistinct is used here if a type has more than one reference to a nother time

                    if (returnOnFirstFound && referees.Count > 0)
                    {
                        return referees;
                    }
                }
            }

            return referees;
        }






        /// <exclude />
        public static string GetBrokenReferencesReport(List<IData> brokenReferences)
        {
            var sb = new StringBuilder();

            const int maximumLinesToShow = 6;

            int toDisplay = brokenReferences.Count > maximumLinesToShow ? maximumLinesToShow - 1 : brokenReferences.Count;
            for (int i = 0; i < toDisplay; i++)
            {
                IData brokenReference = brokenReferences[i];
                Type type = brokenReference.DataSourceId.InterfaceType;


                string typeTitle = DynamicTypeReflectionFacade.GetTitle(type);
                if (string.IsNullOrEmpty(typeTitle))
                {
                    typeTitle = type.FullName;
                }
                
                string labelPropertyName = DynamicTypeReflectionFacade.GetLabelPropertyName(type);
                if (string.IsNullOrEmpty(labelPropertyName))
                {
                    labelPropertyName = "Id"; // This is a nasty fallback, but will work in most cases and all the time with generated types.
                }

                PropertyInfo labelPropertyInfo = brokenReference.GetType().GetProperty(labelPropertyName, BindingFlags.Instance | BindingFlags.Public);
                string dataLabel;

                if (labelPropertyInfo != null)
                {
                    object propertyFieldValue = labelPropertyInfo.GetValue(brokenReference, null);
                    dataLabel = (propertyFieldValue ?? "NULL").ToString();
                }
                else
                {
                    dataLabel = "'Failed to resolve ({0}) field'".FormatWith(labelPropertyName);
                }


                sb.Append("{0}, {1}".FormatWith(typeTitle, dataLabel));
                sb.Append("\n\r");
            }

            if (brokenReferences.Count > maximumLinesToShow)
            {
                sb.Append("...");
            }

            return sb.ToString();
        }
    }
}
