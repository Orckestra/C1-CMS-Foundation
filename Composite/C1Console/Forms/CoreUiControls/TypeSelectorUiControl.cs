using Composite.C1Console.Forms.Foundation;
using System;
using System.Collections.Generic;
using Composite.Core.Types;
using System.ComponentModel;
using System.Globalization;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [Flags]
    [TypeConverter(typeof(UiControlTypeSelectorModeConverter))]
    internal enum UiControlTypeSelectorMode 
    {
        // Composite selector types
        /// <summary>
        /// Include interfaces in the result.
        /// </summary>
        InterfaceTypes = 0x01,
        /// <summary>
        /// Include concrete types in the result.
        /// </summary>
        ConcreteTypes = 0x02,
        /// <summary>
        /// Include primitives in the result.
        /// </summary>
        PrimitiveTypes = 0x04,
    }

    internal class UiControlTypeSelectorModeConverter : TypeConverter
    {
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            return sourceType == typeof(string);
        }

        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            string val = value as string;

            val = val.ToLowerInvariant();
            string[] options = val.Split('|');
            UiControlTypeSelectorMode mode = new UiControlTypeSelectorMode();
            foreach (string opt in options)
            {
                string option = opt.Trim();
                if (option == TypeIncludes.ConcreteTypes.ToString().ToLowerInvariant())
                {
                    mode = mode | UiControlTypeSelectorMode.ConcreteTypes;
                }
                else if (option == TypeIncludes.InterfaceTypes.ToString().ToLowerInvariant())
                {
                     mode = mode | UiControlTypeSelectorMode.InterfaceTypes;
                }
                else if (option == TypeIncludes.PrimitiveTypes.ToString().ToLowerInvariant())
                {
                     mode = mode | UiControlTypeSelectorMode.PrimitiveTypes;
                }
                else
                {
                    throw new FormatException(String.Format("{0} is not a valid TextSelector Mode value - use ConcreteTypes, InterfaceTypes, PrimitiveTypes", value));
                }
            }
            return mode;
        }
    }

    [ControlValueProperty("SelectedType")]
    internal abstract class TypeSelectorUiControl : UiControl
    {


        [BindableProperty()]
        [FormsProperty()]
        public Type SelectedType { get; set; }

        [FormsProperty()]
        public IEnumerable<Type> TypeOptions { get; set; }
        [FormsProperty()]
        public Type AssignableTo { get; set; }
        [FormsProperty()]
        public UiControlTypeSelectorMode Mode { get; set; }

        private static bool IsSet(UiControlTypeSelectorMode flags, UiControlTypeSelectorMode compareFlag)
        {
            return ((flags & compareFlag) == compareFlag);
        }



        private IEnumerable<Type> EnumerateWithCompositeSelector()
        {
            TypeIncludes includes = new TypeIncludes();
            if (IsSet(Mode, UiControlTypeSelectorMode.ConcreteTypes))
            {
                includes = TypeIncludes.ConcreteTypes;
            }
            if (IsSet(Mode, UiControlTypeSelectorMode.InterfaceTypes))
            {
                includes = includes | TypeIncludes.InterfaceTypes;
            }
            if (IsSet(Mode, UiControlTypeSelectorMode.PrimitiveTypes))
            {
                includes = includes | TypeIncludes.PrimitiveTypes;
            }
            return TypeLocator.FindTypes(includes, this.AssignableTo);
        }



        protected IEnumerable<Type> GetTypeOptions()
        {
            if (this.AssignableTo != null && this.TypeOptions != null) 
                throw new InvalidOperationException("Both TypeOptions and AssignableTo has been set. Only one may be set.");

            if (this.TypeOptions != null) 
                return this.TypeOptions;

            if (this.AssignableTo == null)
            {
                throw new ArgumentNullException("AssignableTo");
            }

            return EnumerateWithCompositeSelector();
        }
    }
}
