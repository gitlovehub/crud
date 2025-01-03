@extends('index')


@section('content')
    <div class="row container mt-6">
        <!-- Product Image -->
        <div class="col-md-6">
            <img src="{{ asset('/storage/' . $product->product_thumbnail) }}" class="img-fluid"
                alt="{{ $product->product_name }}">
        </div>
        <!-- Product Details -->
        <div class="col-md-6">
            <h1>{{ $product->product_name }}</h1>
            <p>Giá: {{ $product->product_price }}</p>
            <p>Trạng thái: @if ($product->is_active == 0)
                    Hết hàng
                @else
                    Còn hàng
                @endif
            </p>
            <button class="btn btn-primary">Đặt hàng</button>

        </div>
    </div>
@endsection
