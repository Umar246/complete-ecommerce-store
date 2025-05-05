import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { filters, singleFilter } from "./FilterData";
import {
  FormControl,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Features/productSlice";

//* _______________________________________________________________

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

// const subCategories = [
//   { name: "Totes", href: "#" },
//   { name: "Backpacks", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];
// const filters = [
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White", checked: false },
//       { value: "beige", label: "Beige", checked: false },
//       { value: "blue", label: "Blue", checked: true },
//       { value: "brown", label: "Brown", checked: false },
//       { value: "green", label: "Green", checked: false },
//       { value: "purple", label: "Purple", checked: false },
//     ],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "new-arrivals", label: "New Arrivals", checked: false },
//       { value: "sale", label: "Sale", checked: false },
//       { value: "travel", label: "Travel", checked: true },
//       { value: "organization", label: "Organization", checked: false },
//       { value: "accessories", label: "Accessories", checked: false },
//     ],
//   },
//   {
//     id: "size",
//     name: "Size",
//     options: [
//       { value: "2l", label: "2L", checked: false },
//       { value: "6l", label: "6L", checked: false },
//       { value: "12l", label: "12L", checked: false },
//       { value: "18l", label: "18L", checked: false },
//       { value: "20l", label: "20L", checked: false },
//       { value: "40l", label: "40L", checked: true },
//     ],
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  // const handleFilter = (value, sectionName) => {
  //   console.log('working...' )
  //   const searchParams = new URLSearchParams(location.search);

  //   let filterValue = searchParams.getAll(sectionID);

  //   if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
  //     filterValue = filterValue[0].split(",").filter((item) => item !== value);

  //     if (filterValue.length === 0) {
  //       searchParams.delete(sectionID);
  //     } else {
  //       filterValue.push(value);
  //     }
  //   }

  //   if (filterValue.length > 0) {
  //     searchParams.set(sectionID, filterValue.join(","));
  //     const query = searchParams.toString();
  //     navigate(`?${query}`);
  //   }
  // };

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = parseInt(searchParams.get("page"), 10) || 1;
  const pageSizeValue = parseInt(searchParams.get("pageSize")) || 9;
  const stock = searchParams.get("stock");
  const { products } = useSelector((state) => state.product);

  // console.log("products", products);

  //* _______________________________________________________________

  const handleFilter = (value, sectionName) => {
    //SectionName: Color ya size

    // Create a new URLSearchParams object from the current search query
    const searchParams = new URLSearchParams(location.search);

    // Retrieve existing filter values for the section
    let filterValue = searchParams.get(sectionName)?.split(",") || [];
    console.log("filterValue", filterValue);

    // If the value exists, remove it; otherwise, add it
    if (filterValue.includes(value)) {
      filterValue = filterValue.filter((item) => item !== value);
    } else {
      filterValue.push(value);
    }

    //*Update the searchParams based on the new filterValue array
    if (filterValue.length > 0) {
      searchParams.set(sectionName, filterValue.join(","));
    } else {
      searchParams.delete(sectionName);
    }

    // Navigate to the new URL
    navigate(`?${searchParams.toString()}`);
  };

  //* _______________________________________________________________

  const handleRadioFilter = (value, sectionName) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionName, value);
    navigate(`?${searchParams.toString()}`);
  };

  //* _______________________________________________________________

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 0] : priceValue.split("-").map(Number);

    const data = {
      category: params.levelThree || "",
      colors: colorValue || "",
      sizes: sizeValue || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || Infinity,
      minDiscount: discountValue || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber, // Remove the "- 1" here
      pageSize: pageSizeValue,
      stock: stock || "",
    };

    dispatch(getProducts(data));
  }, [
    params.levelThree,
    colorValue,
    sizeValue,
    priceValue,
    discountValue,
    sortValue,
    pageNumber,
    pageSizeValue,
    stock,
  ]);

  //* _______________________________________________________________

  const handlePaginationChange = (event, value) => {
    const sp = new URLSearchParams(location.search);
    sp.set("page", value);
    sp.set("pageSize", pageSizeValue);
    navigate(`${location.pathname}?${sp.toString()}`);
  };

  //* _______________________________________________________________

  return (
    <div className="bg-[#f2f2f2]">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          className="relative z-40 lg:hidden"
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-[#f2f2f2] py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-[#f2f2f2] p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <>
                <form className="mt-2 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-[#f2f2f2] px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-[#f2f2f2] px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          {/* ... Here */}
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <FormControlLabel
                                  onChange={() =>
                                    handleRadioFilter(option.value, section.id)
                                  }
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Large Screens */}
        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold  text-gray-800">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-[#f2f2f2] shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <div>
                <div className="flex justify-between items-center pt-3 pb-8">
                  <h1 className="text-xl hidden lg:block font-bold mt-4 pb-3  border-b border-gray-200 opacity-60">
                    Filters
                  </h1>
                  <div className="hidden lg:block">
                    <FilterAltIcon
                      className="opacity-50 "
                      sx={{ fontSize: "28px" }}
                    />
                  </div>
                </div>

                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-[#f2f2f2] py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-[#f2f2f2] py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="female"
                                  name="radio-buttons-group"
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <FormControlLabel
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                      onChange={() =>
                                        handleRadioFilter(
                                          option.value,
                                          section.id
                                        )
                                      }
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3 w-full">
                <div className="flex flex-wrap justify-center bg-[#f2f2f2] py-5">
                  {products &&
                    products?.content?.map((item) => (
                      <ProductCard keyValue={item._id} product={item} />
                    ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-[3.6rem]">
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                page={pageNumber}
                count={products?.totalPages}
                color="secondary"
                onChange={handlePaginationChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
