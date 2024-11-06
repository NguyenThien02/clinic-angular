import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AddServiceService {

    isServiceInCart(profileId: number, serviceId: number): boolean {
        const addToProfileId = 'profileId:' + profileId.toString()
        const storedData = localStorage.getItem(addToProfileId);
        // Nếu storedData != null, sử dụng JSON.parse(storedData) để chuyển đổi chuỗi JSON thành một mảng các serviceId.
        // Nếu storedData == null, sử dụng một mảng rỗng [] làm giá trị mặc định cho serviceIds.
        const serviceIds: number[] = storedData ? JSON.parse(storedData) : [];

        // Sử dụng serviceIds.includes(serviceId) để kiểm tra xem serviceId có nằm trong mảng serviceIds hay không.
        return serviceIds.includes(serviceId);
    }

    addToCart(profileId: number, serviceId: number): void {
        // Lấy dữ liệu hiện tại từ localStorage
        const addToProfileId = 'profileId:' + profileId.toString()
        const storedData = localStorage.getItem(addToProfileId);

        // Nếu có dữ liệu, chuyển thành mảng, nếu không thì khởi tạo mảng trống
        let serviceIds: number[] = storedData ? JSON.parse(storedData) : [];

        // Kiểm tra xem serviceId đã tồn tại chưa, nếu chưa thì thêm vào
        if (!serviceIds.includes(serviceId)) {
            serviceIds.push(serviceId);
        }
        // Lưu mảng đã cập nhật lại vào localStorage
        localStorage.setItem(addToProfileId, JSON.stringify(serviceIds));
    }
}