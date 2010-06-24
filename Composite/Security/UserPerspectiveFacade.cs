using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Security
{
	public static class UserPerspectiveFacade
	{
        public static IEnumerable<string> GetSerializedEntityTokens(string username)
        {
            return
                from activePerspective in DataFacade.GetData<IUserActivePerspective>()
                where activePerspective.Username == username
                select activePerspective.SerializedEntityToken;
        }

        
        
        public static IEnumerable<EntityToken> GetEntityTokens(string username )
        {
            return
                GetSerializedEntityTokens(username).Select(f => EntityTokenSerializer.Deserialize(f));
        }



        public static void SetEntityTokens(string username, IEnumerable<EntityToken> entityTokens)
        {
            SetSerializedEntityTokens(username, entityTokens.Select(f => EntityTokenSerializer.Serialize(f)));
        }



        public static void SetSerializedEntityTokens(string username, IEnumerable<string> serializedEntityTokens)
        {
            DataFacade.Delete<IUserActivePerspective>(f => f.Username == username);

            foreach (string serializedEntityToken in serializedEntityTokens)
            {
                IUserActivePerspective activePerspective = DataFacade.BuildNew<IUserActivePerspective>();

                activePerspective.Username = username;
                activePerspective.SerializedEntityToken = serializedEntityToken;
                activePerspective.Id = Guid.NewGuid();

                DataFacade.AddNew<IUserActivePerspective>(activePerspective);
            }
        }



        public static void DeleteAll(string username)
        {
            DataFacade.Delete<IUserActivePerspective>(f => f.Username == username);
        }
    }
}
