using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Linq;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal static class DataContextAssembler
    {
        private static int VersionNumber;

        public static Type EmitDataContextClass(IEnumerable<SqlDataProvider.StoreTypeInfo> fields)
        {
            return EmitDataContextClass(fields.Select(f => new Tuple<string, Type>(f.FieldName, f.FieldType)));
        }

        public static Type EmitDataContextClass(IEnumerable<Tuple<string, Type>> fields)
        {
            var aName = new AssemblyName("SqlDataProvider.DataContext");
            var appDomain = System.Threading.Thread.GetDomain();
            var aBuilder = appDomain.DefineDynamicAssembly(aName, AssemblyBuilderAccess.Run);
            var module = aBuilder.DefineDynamicModule(aName.Name);

            TypeBuilder type = module.DefineType("DynamicDataContext" + (VersionNumber++), 
                TypeAttributes.Public, typeof(DataContextBase), new []{ typeof(ISqlDataContext) } );

            FieldInfo helperClassFieldInfo = BuildField_sqlDataContextHelperClass(type);

            BuildConstructor(type, helperClassFieldInfo);
            BuildMethod_Add(type, helperClassFieldInfo);
            BuildMethod_Remove(type, helperClassFieldInfo);

            foreach (var field in fields)
            {
                type.DefineField(field.Item1, field.Item2, FieldAttributes.Public);
            }

            return type.CreateType();
        }

        private static ConstructorInfo BuildConstructor(TypeBuilder type, FieldInfo helperClassFieldInfo)
        {
            // Declaring method builder
            // Method attributes
            ConstructorBuilder method = type.DefineConstructor(MethodAttributes.Public, 0, new[] { typeof(IDbConnection) });
            // Preparing Reflection instances
            ConstructorInfo ctor1 = typeof(DebuggerNonUserCodeAttribute).GetConstructor(
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new Type[]{
            },
                null
                );
            ConstructorInfo ctor2 = typeof(DataContextBase).GetConstructor(
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new Type[]{
            typeof(IDbConnection)
            },
                null
                );
            ConstructorInfo ctor3 = typeof(SqlDataContextHelperClass).GetConstructor(
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new Type[]{
            typeof(DataContext)
            },
                null
                );
            FieldInfo field4 = helperClassFieldInfo;
            // Adding custom attributes to method
            // [DebuggerNonUserCodeAttribute]
            method.SetCustomAttribute(
                new CustomAttributeBuilder(
                    ctor1,
                    new Type[] { }
                    )
                );
            // Parameter connection
            //ParameterBuilder connection = method.DefineParameter(0, ParameterAttributes.None, "connection");
            ILGenerator gen = method.GetILGenerator();
            // Writing body
            gen.Emit(OpCodes.Ldarg_0);
            gen.Emit(OpCodes.Ldarg_1);
            gen.Emit(OpCodes.Call, ctor2);
            gen.Emit(OpCodes.Ldarg_0);
            gen.Emit(OpCodes.Ldarg_0);
            gen.Emit(OpCodes.Newobj, ctor3);
            gen.Emit(OpCodes.Stfld, field4);
            gen.Emit(OpCodes.Ret);
            // finished
            return method;
        }


        private static FieldBuilder BuildField_sqlDataContextHelperClass(TypeBuilder type)
        {
            FieldBuilder field = type.DefineField(
                "_sqlDataContextHelperClass",
                typeof(SqlDataContextHelperClass),
                  FieldAttributes.Private
                );
            return field;
        }

        private static MethodBuilder BuildMethod_Add(TypeBuilder type, FieldInfo helperClassFieldInfo)
        {
            // Declaring method builder
            // Method attributes
            System.Reflection.MethodAttributes methodAttributes =
                  System.Reflection.MethodAttributes.Public
                | System.Reflection.MethodAttributes.Virtual
                | System.Reflection.MethodAttributes.Final
                | System.Reflection.MethodAttributes.HideBySig
                | System.Reflection.MethodAttributes.NewSlot;
            MethodBuilder method = type.DefineMethod("Add", methodAttributes);
            // Preparing Reflection instances
            FieldInfo field1 = helperClassFieldInfo;
            MethodInfo method2 = typeof(SqlDataContextHelperClass).GetMethod(
                "Add",
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new Type[]{
            typeof(Object),
            typeof(String)
            },
                null
                );
            // Setting return type
            method.SetReturnType(typeof(void));
            // Adding parameters
            method.SetParameters(
                typeof(Object),
                typeof(String)
                );
            // Parameter entity
            ParameterBuilder entity = method.DefineParameter(1, ParameterAttributes.None, "entity");
            // Parameter fieldName
            ParameterBuilder fieldName = method.DefineParameter(2, ParameterAttributes.None, "fieldName");
            ILGenerator gen = method.GetILGenerator();
            // Writing body
            gen.Emit(OpCodes.Ldarg_0);
            gen.Emit(OpCodes.Ldfld, field1);
            gen.Emit(OpCodes.Ldarg_1);
            gen.Emit(OpCodes.Ldarg_2);
            gen.Emit(OpCodes.Callvirt, method2);
            gen.Emit(OpCodes.Ret);
            // finished
            return method;
        }

        private static MethodBuilder BuildMethod_Remove(TypeBuilder type, FieldInfo helperClassFieldInfo)
        {
            // Declaring method builder
            // Method attributes
            System.Reflection.MethodAttributes methodAttributes =
                  System.Reflection.MethodAttributes.Public
                | System.Reflection.MethodAttributes.Virtual
                | System.Reflection.MethodAttributes.Final
                | System.Reflection.MethodAttributes.HideBySig
                | System.Reflection.MethodAttributes.NewSlot;
            MethodBuilder method = type.DefineMethod("Remove", methodAttributes);
            // Preparing Reflection instances
            FieldInfo field1 = helperClassFieldInfo;
            MethodInfo method2 = typeof(SqlDataContextHelperClass).GetMethod(
                "Remove",
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic,
                null,
                new Type[]{
            typeof(Object),
            typeof(String)
            },
                null
                );
            // Setting return type
            method.SetReturnType(typeof(void));
            // Adding parameters
            method.SetParameters(
                typeof(Object),
                typeof(String)
                );
            // Parameter entity
            ParameterBuilder entity = method.DefineParameter(1, ParameterAttributes.None, "entity");
            // Parameter fieldName
            ParameterBuilder fieldName = method.DefineParameter(2, ParameterAttributes.None, "fieldName");
            ILGenerator gen = method.GetILGenerator();
            // Writing body
            gen.Emit(OpCodes.Ldarg_0);
            gen.Emit(OpCodes.Ldfld, field1);
            gen.Emit(OpCodes.Ldarg_1);
            gen.Emit(OpCodes.Ldarg_2);
            gen.Emit(OpCodes.Callvirt, method2);
            gen.Emit(OpCodes.Ret);
            // finished
            return method;
        }
    }
}
