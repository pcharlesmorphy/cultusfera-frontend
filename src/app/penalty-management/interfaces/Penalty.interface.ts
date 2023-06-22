import { User } from '../../user-management/interface/User.interface';

export interface Penalty{
    id?:          number;
    startDate:    Date;
    endDate:      Date;
    status:       boolean;
    reason:       PenaltyReason;
    comments:     string;
    user:         User;
}

export interface PenaltyReason{
    id:           number;
    reason:       string;
}
