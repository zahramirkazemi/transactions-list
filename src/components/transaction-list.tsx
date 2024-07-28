import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  InputRef,
  TableColumnType,
  Button,
  Input,
  Space,
  Badge,
} from "antd";
import { SearchOutlined, CopyOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";

import { fetchTransactions } from "../actions";
import { ReducerState } from "../reducers";
import formatTransaction from "../utils/format-transaction";
import { Transactions } from "../types";
import "./styles/transaction-list.css";

type DataIndex = keyof Transactions;

const TransactionList = () => {
  const dispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);
  const transactions = formatTransaction(
    useSelector((state: ReducerState) => state.transactions) || []
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"]
  ) => confirm();

  const handleReset = (clearFilters: () => void) => clearFilters();

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Transactions> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            پاک کردن
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            فیلتر
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const transactionColumns = [
    {
      title: "شماره تراکنش",
      dataIndex: "trackId",
      key: "trackId",
      ...getColumnSearchProps("trackId"),
      render: (item: string) => (
        <span>
          {item}
          <Button
            type="text"
            onClick={() => navigator.clipboard.writeText(item.toString())}
            icon={<CopyOutlined />}
            size="small"
            style={{ width: 20 }}
          ></Button>
        </span>
      ),
    },
    {
      title: "وضعیت تراکنش",
      dataIndex: "status",
      key: "status",
      render: (item: string) =>
        item ? (
          <Badge status="success" text="پرداخت موفق" />
        ) : (
          <Badge status="error" text="پرداخت ناموفق" />
        ),
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paidAt",
      key: "paidAt",
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "شماره کارت",
      dataIndex: "cardNumber",
      key: "cardNumber",
      ...getColumnSearchProps("cardNumber"),
    },
  ];

  useEffect(() => {
    fetchTransactions(dispatch);
  }, [dispatch]);

  return (
    <div className="transaction-list-container">
      <Table
        dataSource={transactions}
        columns={transactionColumns}
        pagination={false}
        footer={() =>
          `تعداد نتایج: ${new Intl.NumberFormat("fa").format(
            transactions.length
          )}`
        }
      />
    </div>
  );
};

export default TransactionList;
