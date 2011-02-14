#define USE_TEMPTYPECREATOR
using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;


namespace Composite.Data.ExtendedDataType.Debug
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicTempTypeCreator
    {
        private string _namePrefix;
        private List<DataFieldDescriptor> _dataFieldDescriptors;


        /// <exclude />
        public DynamicTempTypeCreator(string namePrefix)
        {
            _namePrefix = namePrefix;

            Initialize();
        }



        /// <exclude />
        public static bool UseTempTypeCreator
        {
            get
            {
#if USE_TEMPTYPECREATOR
                return true;
#else
                return false;
#endif
            }
        }



        /// <exclude />
        public string TypeName
        {
            get;
            private set;
        }



        /// <exclude />
        public string TypeTitle
        {
            get;
            private set;
        }



        /// <exclude />
        public List<DataFieldDescriptor> DataFieldDescriptors
        {
            get
            {
                return _dataFieldDescriptors;
            }
        }


        private void Initialize()
        {
            int counter = 1;
            string typeName = string.Format("{0}{1}", _namePrefix, counter);
            while (true)
            {

                DataTypeDescriptor dataTypeDescriptor =
                    (from d in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors
                     where d.Name == typeName
                     select d).FirstOrDefault();

                if (dataTypeDescriptor == null)
                {
                    this.TypeName = typeName;
                    this.TypeTitle = typeName;
                    break;
                }
                else
                {
                    typeName = string.Format("{0}{1}", _namePrefix, counter++);
                }
            }

            _dataFieldDescriptors = new List<DataFieldDescriptor>();

            DataFieldDescriptor stringDataFieldDescriptor = new DataFieldDescriptor(
                    Guid.NewGuid(),
                    "MyStringField",
                    StoreFieldType.String(64),
                    typeof(string)
                );            

            stringDataFieldDescriptor.Position = 10;
            stringDataFieldDescriptor.FormRenderingProfile = new DataFieldFormRenderingProfile
            {
                Label = "MyStringField",
                HelpText = "This is an auto-generated field.",
                WidgetFunctionMarkup = @"<f:widgetfunction xmlns:f=""http://www.composite.net/ns/function/1.0"" name=""Composite.Widgets.String.TextBox"" label="""" bindingsourcename=""""><f:helpdefinition xmlns:f=""http://www.composite.net/ns/function/1.0"" helptext="""" /></f:widgetfunction>"
            };            

            _dataFieldDescriptors.Add(stringDataFieldDescriptor);


            DataFieldDescriptor intDataFieldDescriptor = new DataFieldDescriptor(
                    Guid.NewGuid(),
                    "MyIntField",
                    StoreFieldType.Integer,
                    typeof(int)
                );
            intDataFieldDescriptor.Position = 11;
            intDataFieldDescriptor.FormRenderingProfile = new DataFieldFormRenderingProfile
            {
                Label = "MyIntField",
                HelpText = "This is an auto-generated field.",
                WidgetFunctionMarkup = @"<f:widgetfunction xmlns:f=""http://www.composite.net/ns/function/1.0"" name=""Composite.Widgets.String.TextBox"" label="""" bindingsourcename=""""><f:helpdefinition xmlns:f=""http://www.composite.net/ns/function/1.0"" helptext="""" /></f:widgetfunction>"
            };

            _dataFieldDescriptors.Add(intDataFieldDescriptor);


            DataFieldDescriptor dateTimeDataFieldDescriptor = new DataFieldDescriptor(
                    Guid.NewGuid(),
                    "MyDateTimeField",
                    StoreFieldType.DateTime,
                    typeof(DateTime?)
                );
            dateTimeDataFieldDescriptor.IsNullable = true;
            dateTimeDataFieldDescriptor.Position = 12;
            dateTimeDataFieldDescriptor.FormRenderingProfile = new DataFieldFormRenderingProfile
            {
                Label = "MyDateTimeField",
                HelpText = "This is an auto-generated field.",
                WidgetFunctionMarkup = @"<f:widgetfunction xmlns:f=""http://www.composite.net/ns/function/1.0"" name=""Composite.Widgets.Date.DateSelector"" label="""" bindingsourcename=""""><f:helpdefinition xmlns:f=""http://www.composite.net/ns/function/1.0"" helptext="""" /></f:widgetfunction>"
            };

            _dataFieldDescriptors.Add(dateTimeDataFieldDescriptor);
        }
    }
}
