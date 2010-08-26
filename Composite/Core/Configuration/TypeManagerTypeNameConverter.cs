using System;
using System.ComponentModel;
using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Properties;

using Composite.Core.Types;

namespace Composite.Core.Configuration
{
	/// <summary>
	/// Represents a configuration converter that converts a string to <see cref="Type"/> using the Composite Type Manager.
	/// </summary>
	internal class TypeManagerTypeNameConverter : ConfigurationConverterBase
	{
		/// <summary>
		/// Returns the name for the passed in Type.
		/// </summary>
		/// <param name="context">The container representing this System.ComponentModel.TypeDescriptor.</param>
		/// <param name="culture">Culture info for assembly</param>
		/// <param name="value">Value to convert.</param>
		/// <param name="destinationType">Type to convert to.</param>
		/// <returns>Assembly Qualified Name as a string</returns>
		public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)
		{
			Type typeValue = value as Type;
			if (typeValue == null)
			{
				throw new ArgumentException("Can not convert type");
			}
			
			if (typeValue != null) return (typeValue).AssemblyQualifiedName;
			return null;
		}

		/// <summary>
		/// Returns a type based on the name passed in as data.
		/// </summary>
		/// <param name="context">The container representing this System.ComponentModel.TypeDescriptor.</param>
		/// <param name="culture">Culture info for assembly.</param>
		/// <param name="value">Data to convert.</param>
		/// <returns>Type of the data</returns>
		public override object ConvertFrom(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value)
		{
			string stringValue = (string)value;
			Type result = TypeManager.GetType(stringValue);
			if (result == null)
			{
				throw new ArgumentException(string.Format("Type \"{0}\" not found.", stringValue));
			}

			return result;
		}		
	}
}
