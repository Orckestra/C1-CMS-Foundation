using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Serialization.CodeGeneration.Foundation;


namespace Composite.Types.Foundation
{
    internal static class BuildManagerSiloHelper
    {
        public static BuildManagerSiloHelperToken SiloEmbedClasses(CodeCompileUnit codeCompileUnit, IEnumerable<Assembly> referencedAssemblies, CompilerParameters compilerParameters)
        {
            Dictionary<Type, List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>>> mapTypeDeclarationInheritances = codeCompileUnit.MapTypeDeclarationInheritance(referencedAssemblies);

            BuildManagerSiloHelperToken token = new BuildManagerSiloHelperToken();

            if (mapTypeDeclarationInheritances.ContainsKey(typeof(IDataId)) == true)
            {
                List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>> dataIdImplementors = mapTypeDeclarationInheritances[typeof(IDataId)];

                token.AddedDataIdCustomSerializers = AddDataIdCustomSerializer(dataIdImplementors.ToBuildManagerSiloDataList(compilerParameters));
            }


            if (mapTypeDeclarationInheritances.ContainsKey(typeof(IData)) == true)
            {
                List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>> dataImplementors = mapTypeDeclarationInheritances[typeof(IData)];

                token.AddedDataEmptyClasses = AddDataEmptyClass(dataImplementors.ToBuildManagerSiloDataList(compilerParameters));
                token.AddedDataWrappers = AddDataWrapperClass(dataImplementors.ToBuildManagerSiloDataList(compilerParameters));
            }

            return token;
        }



        public static void UpdateSiloedPointers(BuildManagerSiloHelperToken buildManagerSiloHelperToken, Assembly resultAssembly, BuildManagerCompileUnit buildManagerCompileUnit)
        {
            if (buildManagerSiloHelperToken.AddedDataIdCustomSerializers != null)
            {
                foreach (var kvp in buildManagerSiloHelperToken.AddedDataIdCustomSerializers)
                {
                    Type dataIdClassType = resultAssembly.GetType(kvp.Key, true);
                    Type dataIdCustomSerializerClassType = resultAssembly.GetType(kvp.Value, true);

                    Composite.Serialization.CodeGeneration.SerializerGenerator.AddSerializerType(dataIdClassType, dataIdCustomSerializerClassType);

                    buildManagerCompileUnit.AddType(new BuildManagerCompileType(dataIdCustomSerializerClassType));
                }
            }

            if (buildManagerSiloHelperToken.AddedDataEmptyClasses != null)
            {
                foreach (var kvp in buildManagerSiloHelperToken.AddedDataEmptyClasses)
                {
                    Type interfaceType = resultAssembly.GetType(kvp.Key, true);
                    Type interfaceEmptyClassType = resultAssembly.GetType(kvp.Value, true);

                    Composite.Data.Foundation.CodeGeneration.EmptyDataClassGenerator.AddSerializerType(interfaceType, interfaceEmptyClassType);

                    buildManagerCompileUnit.AddType(new BuildManagerCompileType(interfaceEmptyClassType));
                }
            }

            if (buildManagerSiloHelperToken.AddedDataWrappers != null)
            {
                foreach (var kvp in buildManagerSiloHelperToken.AddedDataWrappers)
                {
                    Type interfaceType = resultAssembly.GetType(kvp.Key, true);
                    Type interfaceDataWrapperClassType = resultAssembly.GetType(kvp.Value, true);

                    DataWrapperGenerator.AddDataWrapperType(interfaceType, interfaceDataWrapperClassType);

                    buildManagerCompileUnit.AddType(new BuildManagerCompileType(interfaceDataWrapperClassType));
                }
            }
        }

		private static void UpdateSerializerPointer(Type type)
		{
            if (!type.IsClass || !typeof(ISerializer).IsAssignableFrom(type))
            {
                return;
            }

		    var customSerializerPointerAttribute = type.GetCustomAttributesRecursively<BuildManagerCustomSerializerPointerAttribute>().ToList();
		    if (customSerializerPointerAttribute.Count != 1)
		    {
		        return;
		    }

		    string typeName = customSerializerPointerAttribute[0].PropertyClassTypeName ?? string.Empty;
		    string typeNamespace = customSerializerPointerAttribute[0].PropertyClassNamespaceName ?? string.Empty;

		    Type propertyClassType = type.Assembly.GetType(typeNamespace + "." + typeName);

		    Verify.IsNotNull(propertyClassType, "Failed to find a class in the generated assembly. Name: '{0}', Namespace: '{1}'", typeName, typeNamespace);

		    Composite.Serialization.CodeGeneration.SerializerGenerator.AddSerializerType(propertyClassType, type);
		}

		private static void UpdateEmptyClassPointer(Type type)
		{
			if(type.BaseType != typeof(EmptyDataClassBase))
			{
				return;
			}

			foreach (var interf in type.GetInterfaces())
			{
				if (interf != typeof(IData)
					&& typeof(IData).IsAssignableFrom(interf))
				{
					// TODO: Debt, is it has sense to load types from other assemblies
					if(interf.Assembly == type.Assembly || interf.Assembly == typeof(BuildManagerSiloHelper).Assembly)
					{
						EmptyDataClassGenerator.AddSerializerType(interf, type);
					}
				
					break;
				}
			}

			// TODO: Check if checking by attributes has more sense
			//var emptyClassPointerAttribute = type.GetCustomAttributesRecursively<BuildManagerEmptyClassPointerAttribute>().ToList();
			//if (emptyClassPointerAttribute.Count == 1)
			//{
			//    Type interfaceType =
			//        (from t in type.Assembly.GetTypes()
			//         where t.Name == emptyClassPointerAttribute[0].InterfaceTypeName &&
			//               t.Namespace == emptyClassPointerAttribute[0].InterfaceNamespaceName
			//         select t).First();

			//    if (interfaceType == null) throw new InvalidOperationException();

			//    Composite.Data.Foundation.CodeGeneration.EmptyDataClassGenerator.AddSerializerType(interfaceType, type);
			//}			
		}


		private static void UpdateDataWrapperPointer(Type type)
		{
			if (!typeof(IDataWrapper).IsAssignableFrom(type))
				return;

			foreach (var interf in type.GetInterfaces())
			{
				if (interf != typeof(IData)
					&& typeof(IData).IsAssignableFrom(interf))
				{
					DataWrapperGenerator.AddDataWrapperType(interf, type);
					break;
				}
			}

			// TODO: Check if checking by attributes has more sense
			//List<BuildManagerDataWrapperClassPointerAttribute> cachingWrapperClassPointerAttribute = type.GetCustomAttributesRecursively<BuildManagerDataWrapperClassPointerAttribute>().ToList();
			//if (cachingWrapperClassPointerAttribute.Count == 1)
			//{
			//    Type interfaceType =
			//        (from t in allTypes
			//         where t.Name == cachingWrapperClassPointerAttribute[0].InterfaceTypeName &&
			//               t.Namespace == cachingWrapperClassPointerAttribute[0].InterfaceNamespaceName
			//         select t).First();

			//    if (interfaceType == null) throw new InvalidOperationException();

			//    Composite.Data.Caching.CodeGeneration.CachingWrapperGenerator.AddDataWrapperType(interfaceType, type);
			//}
		}

		/// <summary>
		/// Updates references to related generated classes (serializers, caching wrappers, "empty" wrappers).
		/// </summary>
		/// <param name="type">The type.</param>
        public static void UpdateSiloedPointers(Type type)
		{
			if (!type.IsClass)
			{
				return;
			}

			UpdateSerializerPointer(type);

			UpdateEmptyClassPointer(type);

			UpdateDataWrapperPointer(type);			
		}

    	/// <summary>
		/// Updates references to related generated classes (serializers, data wrappers, "empty" wrappers).
		/// </summary>
		/// <param name="type">The type.</param>
		/// <param name="allTypes">Collection of types to choose from.</param>
		[Obsolete("Use UpdateSiloedPointers(type) insead")]
        public static void UpdateSiloedPointers(Type type, IEnumerable<Type> allTypes)
        {
    		UpdateSiloedPointers(type);
        }


        private static Dictionary<string, string> AddDataIdCustomSerializer(List<BuildManagerSiloData> buildManagerSiloDatas)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            foreach (BuildManagerSiloData buildManagerSiloData in buildManagerSiloDatas)
            {
                CodeTypeDeclaration codeTypeDeclaration = Composite.Serialization.CodeGeneration.SerializerGenerator.CreateCodeTypeDeclaration(buildManagerSiloData);

                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(BuildManagerCustomSerializerPointerAttribute).FullName,
                        new CodeAttributeArgument[] { 
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeNamespace.Name)),
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeTypeDeclaration.Name)) 
                        }));

                buildManagerSiloData.CodeNamespace.Types.Add(codeTypeDeclaration);

                result.Add(GetTypeFullName(buildManagerSiloData.CodeNamespace, buildManagerSiloData.CodeTypeDeclaration),
                           GetTypeFullName(buildManagerSiloData.CodeNamespace, codeTypeDeclaration));
            }

            return result;
        }



        private static Dictionary<string, string> AddDataEmptyClass(List<BuildManagerSiloData> buildManagerSiloDatas)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            foreach (BuildManagerSiloData buildManagerSiloData in buildManagerSiloDatas)
            {
                CodeTypeDeclaration codeTypeDeclaration = Composite.Data.Foundation.CodeGeneration.EmptyDataClassGenerator.CreateCodeTypeDeclaration(buildManagerSiloData);

                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(BuildManagerEmptyClassPointerAttribute).FullName,
                        new CodeAttributeArgument[] { 
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeNamespace.Name)), 
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeTypeDeclaration.Name)) 
                        }));

                buildManagerSiloData.CodeNamespace.Types.Add(codeTypeDeclaration);

                result.Add(GetTypeFullName(buildManagerSiloData.CodeNamespace, buildManagerSiloData.CodeTypeDeclaration),
                           GetTypeFullName(buildManagerSiloData.CodeNamespace, codeTypeDeclaration));
            }

            return result;
        }



        private static Dictionary<string, string> AddDataWrapperClass(List<BuildManagerSiloData> buildManagerSiloDatas)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            foreach (BuildManagerSiloData buildManagerSiloData in buildManagerSiloDatas)
            {
                CodeTypeDeclaration codeTypeDeclaration = DataWrapperGenerator.CreateCodeTypeDeclaration(buildManagerSiloData);

                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(BuildManagerDataWrapperClassPointerAttribute).FullName,
                        new CodeAttributeArgument[] { 
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeNamespace.Name)), 
                            new CodeAttributeArgument(new CodePrimitiveExpression(buildManagerSiloData.CodeTypeDeclaration.Name)) 
                        }));

                buildManagerSiloData.CodeNamespace.Types.Add(codeTypeDeclaration);

                result.Add(GetTypeFullName(buildManagerSiloData.CodeNamespace, buildManagerSiloData.CodeTypeDeclaration),
                           GetTypeFullName(buildManagerSiloData.CodeNamespace, codeTypeDeclaration));
            }

            return result;
        }



        private static List<BuildManagerSiloData> ToBuildManagerSiloDataList(this List<KeyValuePair<CodeNamespace, CodeTypeDeclaration>> namespaceTypeDeclarationPairs, CompilerParameters compilerParameters)
        {
            if (namespaceTypeDeclarationPairs == null) throw new ArgumentNullException("namespaceTypeDeclarationPairs");

            List<BuildManagerSiloData> result = new List<BuildManagerSiloData>();

            foreach (var kvp in namespaceTypeDeclarationPairs)
            {
                BuildManagerSiloData buildManagerSiloData = new BuildManagerSiloData(kvp.Key, kvp.Value, compilerParameters);

                result.Add(buildManagerSiloData);
            }

            return result;
        }

        private static string GetTypeFullName(CodeNamespace codeNamespace, CodeTypeDeclaration codeTypeDeclaration)
        {
            return codeNamespace.Name + "." + codeTypeDeclaration.Name;
        }


        internal sealed class BuildManagerSiloHelperToken
        {
            internal BuildManagerSiloHelperToken()
            {
            }

            internal Dictionary<string, string> AddedDataIdCustomSerializers { get; set; }
            internal Dictionary<string, string> AddedDataEmptyClasses { get; set; }
            internal Dictionary<string, string> AddedDataWrappers { get; set; }
        }
    }
}
