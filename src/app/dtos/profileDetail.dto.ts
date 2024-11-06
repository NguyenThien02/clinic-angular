export class ProfileDetailDTO {
    profile_id: number;

    service_ids: number[];

    constructor(data: any) {
        this.profile_id = data.profile_id;
        this.service_ids = data.service_ids
    }
}