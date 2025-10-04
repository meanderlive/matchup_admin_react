
 

import COLORS from "../../../common/data/enumColors";
import { TColor } from "../../../type/color-type";

 

export interface IEventStatus {
	[key: string]: { name: string; value:any,color: TColor };
}
const ActiveUser: IEventStatus = {
	Active: { name: 'Active', value:"Active",color: COLORS.SUCCESS.name },
	Inactive: { name: 'Inactive',value:'Inactive', color: COLORS.WARNING.name },
	Block: { name: 'Block', value:"Blocked",color: COLORS.DANGER.name },
	Suspended: { name: 'Suspended', value:"Suspended",color: COLORS.WARNING.name },
	Deleted: { name: 'Deleted', value:"Deleted",color: COLORS.DARK.name },
	Verified: { name: 'Verified', value:"Verified",color: COLORS.INFO.name },
	Unverified: { name: 'Unverified', value:"Unverified",color: COLORS.SECONDARY.name },
};
export default ActiveUser;
