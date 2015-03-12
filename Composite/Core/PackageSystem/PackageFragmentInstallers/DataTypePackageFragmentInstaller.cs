using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.C1Console.Events;
using Composite.Core.Types;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary> 
    /// Creates data stores for static data types. Can be used in combination with <see cref="DataPackageFragmentInstaller"/> to install content.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataTypePackageFragmentInstaller : BasePackageFragmentInstaller
	{
        private List<DataTypeDescriptor> _typesToInstall = null;
        private static readonly string LogTitle = typeof (DataTypePackageFragmentInstaller).FullName;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var  validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.OnlyOneElement"));
                return validationResult;
            }

            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");
            if (typesElement == null)
            {
                validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.MissingElement"));
                return validationResult;
            }

            _typesToInstall = new List<DataTypeDescriptor>();

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                XAttribute nameAttribute = typeElement.Attribute("name");
                if (nameAttribute == null)
                {
                    validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.MissingAttribute").FormatWith("name"), typeElement);
                    continue;
                }

                Type type = TypeManager.TryGetType(nameAttribute.Value);
                if (type == null)
                {
                    validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.TypeNotConfigured").FormatWith(nameAttribute.Value));
                }
                else if (!typeof(IData).IsAssignableFrom(type))
                {
                    validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.TypeNotInheriting").FormatWith(type, typeof(IData)));
                }
                else if (DataFacade.GetAllKnownInterfaces().Contains(type))
                {
                    validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.TypeExists").FormatWith(type));
                }
                else
                {
                    DataTypeDescriptor dataTypeDescriptor = null;
                    try
                    {
                        dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
                        dataTypeDescriptor.Validate();
                    }
                    catch(Exception ex)
                    {
                        validationResult.AddFatal(GetText("DataTypePackageFragmentInstaller.InterfaceCodeError").FormatWith(type));
                        validationResult.AddFatal(ex);

                        Log.LogError(LogTitle, ex);
                    }

                    if (dataTypeDescriptor != null)
                    {
                        _typesToInstall.Add(dataTypeDescriptor);
                        this.InstallerContext.AddPendingDataType(type);
                    }
                }
            }

            if (validationResult.Count > 0)
            {
                _typesToInstall = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            Verify.IsNotNull(_typesToInstall, "DataTypePackageFragmentInstaller has not been validated");

            string typeNames = string.Join(", ", _typesToInstall.Select(t => t.GetFullInterfaceName()));
            Log.LogVerbose(this.GetType().Name, "Installing types: '{0}'", typeNames);


            DynamicTypeManager.CreateStores(_typesToInstall, false);

            var typeElements = new List<XElement>();
            foreach (var dataTypeDescriptor in _typesToInstall)
            {
                var typeElement = new XElement("Type", new XAttribute("typeId", dataTypeDescriptor.DataTypeId));
                typeElements.Add(typeElement);
            }

            GlobalEventSystemFacade.FlushTheSystem(true);

            yield return new XElement("Types", typeElements);
        }


        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
