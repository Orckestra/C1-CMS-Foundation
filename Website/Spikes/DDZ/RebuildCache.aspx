<%@ Page Language="C#"  %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="Composite.Data.DynamicTypes" %>
<%@ Import Namespace="Composite.Types" %>
<%@ Import Namespace="Composite.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Reflection" %>

<%

	    var compilationUnits = new List<BuildManagerCompileUnit>();

            List<Type> generatedInterfaces = DataFacade.GetAllInterfaces().Where(type => type.IsGenerated()).ToList();
            foreach (Type type in generatedInterfaces)
            {
                DataTypeDescriptor typeDescriptor;
                if(!DynamicTypeManager.TryGetDataTypeDescriptor(type, out typeDescriptor))
                {
                    continue;
                }

                Type interfaceCodeGenerator = typeof(IData).Assembly.GetType("Composite.Data.GeneratedTypes.Foundation.InterfaceCodeGenerator", true);
                MethodInfo methodInfo = interfaceCodeGenerator.GetMethod("GenerateCompilationUnit", BindingFlags.NonPublic | BindingFlags.Static);

                compilationUnits.Add((BuildManagerCompileUnit)methodInfo.Invoke(null, new object[] { typeDescriptor }));
            }

            if(compilationUnits.Count > 0)
            {
                BuildManager.RebuildCache(compilationUnits.ToArray());
            }
%>