#define USE_TEMPTYPECREATOR
using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;


namespace Composite.Data.ExtendedDataType.Debug
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DynamicTempTypeCreator
    {
        private readonly string _namePrefix;
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
            while (true)
            {
                string typeName = string.Format("{0}{1}", _namePrefix, counter++);

                if (!DataMetaDataFacade.GeneratedTypeDataTypeDescriptors.Any(d => d.Name == typeName))
                {
                    TypeName = TypeTitle = typeName;
                    break;
                }
            }

            
            _dataFieldDescriptors = new List<DataFieldDescriptor>
            {
                new DataFieldDescriptor(Guid.NewGuid(), "MyStringField", StoreFieldType.String(64), typeof(string))
                {
                    Position = 10,
                    FormRenderingProfile = new DataFieldFormRenderingProfile
                    {
                        Label = "MyStringField",
                        HelpText = "This is an auto-generated field.",
                        WidgetFunctionMarkup = GetWidgetFunctionMarkup("Composite.Widgets.String.TextBox")
                    },
                    TreeOrderingProfile = new DataFieldTreeOrderingProfile
                    {
                        OrderPriority = 1,
                        OrderDescending = false,
                    }
                }, 
                new DataFieldDescriptor(Guid.NewGuid(), "MyIntField", StoreFieldType.Integer, typeof(int))
                {
                    Position = 11,
                    FormRenderingProfile = new DataFieldFormRenderingProfile
                    {
                        Label = "MyIntField",
                        HelpText = "This is an auto-generated field.",
                        WidgetFunctionMarkup = GetWidgetFunctionMarkup("Composite.Widgets.String.TextBox")
                    },
                    TreeOrderingProfile = new DataFieldTreeOrderingProfile
                    {
                        OrderPriority = 2,
                        OrderDescending = true,
                    }
                },
                new DataFieldDescriptor(Guid.NewGuid(), "MyDateTimeField", StoreFieldType.DateTime, typeof(DateTime?))
                {
                    IsNullable = true,
                    Position = 12,
                    FormRenderingProfile = new DataFieldFormRenderingProfile
                    {
                        Label = "MyDateTimeField",
                        HelpText = "This is an auto-generated field.",
                        WidgetFunctionMarkup = GetWidgetFunctionMarkup("Composite.Widgets.Date.DateSelector")
                    },
                    TreeOrderingProfile = new DataFieldTreeOrderingProfile
                    {
                        OrderPriority = null,
                    }
                }
            };
        }

        private static string GetWidgetFunctionMarkup(string widgetFunctionName)
        {
            return @"<f:widgetfunction xmlns:f=""http://www.composite.net/ns/function/1.0"" name=""{Name}"" label="""" bindingsourcename="""">
                         <f:helpdefinition xmlns:f=""http://www.composite.net/ns/function/1.0"" helptext="""" />
                     </f:widgetfunction>".Replace("{Name}", widgetFunctionName);
        }
    }
}